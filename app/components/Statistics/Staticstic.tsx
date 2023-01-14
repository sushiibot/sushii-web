import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

export interface StatsCardProps {
  title: string;
  value: string;
  icon: IconType;
}

function StatsCard(props: StatsCardProps) {
  const { title, value } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.300", "gray.700")}
      rounded={"lg"}
      _hover={{
        background: useColorModeValue("gray.200", "gray.900"),
        shadow: "2xl",
      }}
      transition={"all .2s ease"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
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
          {<props.icon width="lg" height="lg" />}
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
