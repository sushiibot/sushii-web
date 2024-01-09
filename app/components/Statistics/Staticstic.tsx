import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { FiHome, FiCommand, FiUsers } from "react-icons/fi/index.js";

const ICON_MAP: Record<string, IconType> = {
  guild_count: FiHome,
  member_count: FiUsers,
  command_count: FiCommand,
};

const SORT_ORDER = ["guild_count", "member_count", "command_count"];

const TITLE_MAP: Record<string, string> = {
  guild_count: "Servers",
  // TODO: Change to "user_count"
  member_count: "Users",
  command_count: "Commands run",
};

export interface StatsCardProps {
  name: string;
  value: string;
}

function StatsCard(props: StatsCardProps) {
  const { name, value } = props;

  const displayName = TITLE_MAP[name];
  const CardIcon = ICON_MAP[name];

  return (
    <Stat
      px={{ base: 2, md: 6 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.300", "gray.600")}
      rounded={"lg"}
      _hover={{
        background: useColorModeValue("gray.200", "gray.600"),
        shadow: "2xl",
      }}
      transition={"all .2s ease"}
    >
      <Flex justifyContent={"space-between"}>
        <Box>
          <StatLabel fontWeight={"medium"} isTruncated>
            {displayName}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {value}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.400", "gray.200")}
          alignContent={"center"}
        >
          {<CardIcon size={18} />}
        </Box>
      </Flex>
    </Stat>
  );
}

export interface StatisticsProps {
  stats: StatsCardProps[];
}

export default function Statistics({ stats }: StatisticsProps) {
  const sorted = stats.sort((a, b) => {
    return SORT_ORDER.indexOf(a.name) - SORT_ORDER.indexOf(b.name);
  });

  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {sorted.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
