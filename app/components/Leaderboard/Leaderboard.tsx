import { Box } from "@chakra-ui/react";
import type { LeaderboardUserProps } from "./LeaderboardUser";
import LeaderboardUser from "./LeaderboardUser";

export interface LeaderboardProps {
  items: LeaderboardUserProps[];
}

export default function Leaderboard({ items }: LeaderboardProps) {
  return (
    <Box>
      {items.map((item, index) => (
        <LeaderboardUser key={item.username} {...item} />
      ))}
    </Box>
  );
}
