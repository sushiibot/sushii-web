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

export interface StatsCardProps {
  title: string;
  value: string;
  icon: IconType;
}

function StatsCard(props: StatsCardProps) {
  const { title, value } = props;
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
            {title}
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
          {<props.icon size={18} />}
        </Box>
      </Flex>
    </Stat>
  );
}

export interface StatisticsProps {
  stats: StatsCardProps[];
}

export default function Statistics({ stats }: StatisticsProps) {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
