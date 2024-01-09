import { Container, Heading } from "@chakra-ui/react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import Leaderboard from "~/components/Leaderboard/Leaderboard";
import db from "~/db/database.server";
import logger from "~/logger";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { getGuildRanks } from "~/db/Leaderboard/Leaderboard.server";
import type { LeaderboardUserProps } from "~/components/Leaderboard/LeaderboardUser";
import UserLevelProgress from "~/user/UserLevelProgress";
import { mixedBigIntToNumber } from "~/utils/mixedBigInt";

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<TypedResponse<LeaderboardUserProps[]>> => {
  if (!params.guildId) {
    // throw json("Not found", { status: 404 });
    return json([]);
  }

  const data = await getGuildRanks(db, params.guildId, "all_time", 100, 0);

  logger.debug(
    { guildId: params.guildId, len: data.length },
    "queried guild leaderboard"
  );

  const items = data.map((row, i): LeaderboardUserProps => {
    const xpTotal = mixedBigIntToNumber(row.xpTotal);
    const userLevel = new UserLevelProgress(xpTotal);

    return {
      rank: i,
      userId: row.userId,
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
      <Leaderboard items={leaderboardData} bottomRef={ref} />
    </Container>
  );
}
