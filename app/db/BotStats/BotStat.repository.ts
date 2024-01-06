import type { Kysely } from "kysely";
import type { DB } from "../types";
import type { BotStatRow } from "./BotStat.table";

export function getAllBotStats(db: Kysely<DB>): Promise<BotStatRow[]> {
  return db.selectFrom("app_public.bot_stats").selectAll().execute();
}
