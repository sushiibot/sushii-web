import { Container, Heading, Text } from "@chakra-ui/react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { LeaderboardProps } from "~/components/Leaderboard/Leaderboard";
import Leaderboard from "~/components/Leaderboard/Leaderboard";
import { client } from "~/database.server";
import logger from "~/logger";
import { getLeaderboard } from "./leaderboard._index/getLeadboard.queries";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export const loader = async ({
  params,
}: LoaderArgs): Promise<Pick<LeaderboardProps, "items">> => {
  if (!params.guildId) {
    // throw json("Not found", { status: 404 });
    return {
      items: [],
    };
  }

  const data = await getLeaderboard.run(
    {
      // Per guild
      guildId: params.guildId,
      timeframe: "ALL_TIME",
      offset: 0,
    },
    client
  );

  logger.debug(
    { guildId: params.guildId, len: data.length },
    "queried guild leaderboard"
  );

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

export default function ServerLeaderboard() {
  const leaderboardData = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const { ref, inView, entry } = useInView({});

  useEffect(() => {
    if (inView) {
      fetcher.load("/api/leaderboard/1234");
    }
  }, [fetcher, entry, inView]);

  return (
    <Container mx="auto" w="full" maxW="8xl">
      <Heading marginY="4">Leaderboard</Heading>
      <br />
      <Leaderboard items={leaderboardData.items} bottomRef={ref} />
    </Container>
  );
}
