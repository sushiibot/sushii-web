import { sql, type QueryCreator } from "kysely";
import type { DB } from "../types";

type TimeFrame = "day" | "week" | "month" | "all_time";

export interface UserRank {
  userId: string;
  rank: number;
  xpTotal: string | number | bigint;

  // Nullable since user might not be cached
  username: string | null;
  avatarUrl: string | null;
  discriminator: number | null;
}

export function getGlobalRanks(
  db: QueryCreator<DB>,
  timeframe: TimeFrame,
  limit: number,
  offset: number
): Promise<UserRank[]> {
  let query = db
    // Subquery to get the total XP for each user
    .selectFrom((eb) =>
      eb
        .selectFrom("app_public.user_levels")
        .select(({ fn }) => [
          "user_id",
          fn.sum("msg_day").as("msg_day"),
          fn.sum("msg_week").as("msg_week"),
          fn.sum("msg_month").as("msg_month"),
          fn.sum("msg_all_time").as("msg_all_time"),
        ])
        .groupBy("user_id")
        .as("global_xp")
    )
    .leftJoin("app_public.cached_users", (join) =>
      join.onRef("user_id", "=", "id")
    )
    .select(({ fn }) => [
      "user_id as userId",
      "avatar_url as avatarUrl",
      "name as username",
      "discriminator",

      // Rank stuff
      "msg_all_time as xpTotal",
      fn
        .agg<number>("row_number")
        .over((ob) => {
          switch (timeframe) {
            case "day":
              return ob.orderBy("msg_day", "desc");
            case "week":
              return ob.orderBy("msg_week", "desc");
            case "month":
              return ob.orderBy("msg_month", "desc");
            case "all_time":
              return ob.orderBy("msg_all_time", "desc");
          }
        })
        .as("rank"),
    ])
    .limit(limit)
    .offset(offset);

  switch (timeframe) {
    case "day": {
      query = query
        .where(
          sql`extract(doy from last_msg)`,
          "=",
          sql`extract(doy from now())`
        )
        .where(
          sql`extract(year from last_msg)`,
          "=",
          sql`extract(year from now())`
        )
        .orderBy("msg_day", "desc");
    }
    case "week": {
      query = query
        .where(
          sql`extract(week from last_msg)`,
          "=",
          sql`extract(week from now())`
        )
        .where(
          sql`extract(year from last_msg)`,
          "=",
          sql`extract(year from now())`
        )
        .orderBy("msg_week", "desc");
    }
    case "month": {
      query = query
        .where(
          sql`extract(month from last_msg)`,
          "=",
          sql`extract(month from now())`
        )
        .where(
          sql`extract(year from last_msg)`,
          "=",
          sql`extract(year from now())`
        )
        .orderBy("msg_month", "desc");
    }
    case "all_time": {
      query = query.orderBy("msg_all_time", "desc");
    }
  }

  return query.execute();
}

/**
 * Get the ranks and XP of all users in a timeframe.
 *
 * @param db database
 * @param guildId guild ID
 * @param timeframe
 */
export function getGuildRanks(
  db: QueryCreator<DB>,
  guildId: string,
  timeframe: TimeFrame,
  limit: number,
  offset: number
): Promise<UserRank[]> {
  let query = db
    .selectFrom("app_public.user_levels")
    .leftJoin("app_public.cached_users", (join) =>
      join.onRef("user_id", "=", "id")
    )
    .select(({ fn }) => [
      "user_id as userId",
      "avatar_url as avatarUrl",
      "name as username",
      "discriminator",

      // Rank stuff
      "msg_all_time as xpTotal",
      fn
        .agg<number>("row_number")
        .over((ob) => {
          switch (timeframe) {
            case "day":
              return ob.orderBy("msg_day", "desc");
            case "week":
              return ob.orderBy("msg_week", "desc");
            case "month":
              return ob.orderBy("msg_month", "desc");
            case "all_time":
              return ob.orderBy("msg_all_time", "desc");
          }
        })
        .as("rank"),
    ])
    .where("guild_id", "=", guildId)
    .limit(limit)
    .offset(offset);

  switch (timeframe) {
    case "day": {
      query = query
        .where(
          sql`extract(doy from last_msg)`,
          "=",
          sql`extract(doy from now())`
        )
        .where(
          sql`extract(year from last_msg)`,
          "=",
          sql`extract(year from now())`
        )
        .orderBy("msg_day", "desc");
    }
    case "week": {
      query = query
        .where(
          sql`extract(week from last_msg)`,
          "=",
          sql`extract(week from now())`
        )
        .where(
          sql`extract(year from last_msg)`,
          "=",
          sql`extract(year from now())`
        )
        .orderBy("msg_week", "desc");
    }
    case "month": {
      query = query
        .where(
          sql`extract(month from last_msg)`,
          "=",
          sql`extract(month from now())`
        )
        .where(
          sql`extract(year from last_msg)`,
          "=",
          sql`extract(year from now())`
        )
        .orderBy("msg_month", "desc");
    }
    case "all_time": {
      query = query.orderBy("msg_all_time", "desc");
    }
  }

  return query.execute();
}
