import { Container, Heading, Text } from "@chakra-ui/react";
import { json, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, TypedResponse } from "@remix-run/node";
import Leaderboard from "~/components/Leaderboard/Leaderboard";
import logger from "~/logger";
import leaderboardCache from "./cache.server";
import { getGlobalRanks } from "~/db/Leaderboard/Leaderboard.server";
import db from "~/db/database.server";
import type { LeaderboardUserProps } from "~/components/Leaderboard/LeaderboardUser";
import { mixedBigIntToNumber } from "~/utils/mixedBigInt";
import UserLevelProgress from "~/user/UserLevelProgress";

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<TypedResponse<LeaderboardUserProps[]>> => {
  // Check cache first
  let data = leaderboardCache.get("global");

  if (data) {
    logger.debug({ len: data.length }, "got global leaderboard from cache");
  } else {
    // Not cached, query db
    data = await getGlobalRanks(db, "all_time", 100, 0);

    // Cache for 5 minutes
    logger.debug({ len: data.length }, "queried global leaderboard, caching");
    leaderboardCache.set("global", data);
  }

  const items = data.map((row, i): LeaderboardUserProps => {
    const xpTotal = mixedBigIntToNumber(row.xpTotal);
    const userLevel = new UserLevelProgress(xpTotal);

    return {
      rank: i,
      userId: row.userId || "0",
      avatarUrl: row.avatarUrl,
      username: row.username || "Unknown",
      discriminator: row.discriminator || 0,
      xpTotal: xpTotal,
      level: userLevel.level,
      xpProgress: userLevel.nextLevelXpProgress,
    };
  });

  return json(items);
};

export default function GlobalLeaderboard() {
  const leaderboardData = useLoaderData<typeof loader>();

  return (
    <Container mx="auto" w="full" maxW="8xl">
      <Heading marginY="4">Global Leaderboard</Heading>
      <Text>
        The global leaderboard shows the top users with the most XP across all
        servers sushii is in.
      </Text>
      <br />
      <Leaderboard items={leaderboardData} />
    </Container>
  );
}
