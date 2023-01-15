import { Container, Heading, Text } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import type { LeaderboardProps } from "~/components/Leaderboard/Leaderboard";
import Leaderboard from "~/components/Leaderboard/Leaderboard";

export const loader = async (): Promise<LeaderboardProps> => {
  return {
    items: [
      {
        rank: 1,
        username: "capoo",
        discriminator: "0001",
        xpProgress: 100,
        xpTotal: 300,
      },
      {
        rank: 2,
        username: "dogdog",
        discriminator: "0002",
        xpProgress: 250,
        xpTotal: 300,
      },
    ],
  };
};

export default function Commands() {
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
