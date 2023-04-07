import { Container, Heading, Text } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import type { LeaderboardProps } from "~/components/Leaderboard/Leaderboard";
import Leaderboard from "~/components/Leaderboard/Leaderboard";
import { client } from "~/database.server";
import logger from "~/logger";
import { getLeaderboard } from "./getLeadboard.queries";
import leaderboardCache from "./cache.server";

export const loader = async ({
  params,
}: LoaderArgs): Promise<LeaderboardProps> => {
  // Check cache first
  let data = leaderboardCache.get("global");

  if (data) {
    logger.debug({ len: data.length }, "got global leaderboard from cache");
  }

  if (!data) {
    // Not cached, query db
    data = await getLeaderboard.run(
      {
        // Global
        guildId: null,
        timeframe: "ALL_TIME",
        offset: 0,
      },
      client
    );

    // Cache for 5 minutes
    logger.debug({ len: data.length }, "queried global leaderboard, caching");
    leaderboardCache.set("global", data);
  }

  const items = data.map((row, i) => {
    return {
      rank: i,
      userId: row.user_id || "0",
      avatarHash: row.avatar_url || undefined,
      username: row.username || "Unknown",
      discriminator: row.discriminator?.toString() || "0000",
      level: row.current_level || "0",
      xpProgress: parseInt(row.next_level_xp_progress || "0", 10),
      xpTotal: parseInt(row.xp || "0", 10),
    };
  });

  return {
    items,
  };
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
      <Leaderboard items={leaderboardData.items} />
    </Container>
  );
}
