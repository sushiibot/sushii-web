import type { IconProps } from "@chakra-ui/react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { FiHome, FiCommand, FiUsers } from "react-icons/fi";
import type { StatisticsProps } from "~/components/Statistics/Staticstic";
import Statistics from "~/components/Statistics/Staticstic";

const botStats: StatisticsProps["stats"] = [
  {
    title: "Servers",
    value: "4,321",
    icon: FiHome,
  },
  {
    title: "Members",
    value: "1.65M",
    icon: FiUsers,
  },
  {
    title: "Commands run",
    value: "1.8M",
    icon: FiCommand,
  },
];

export default function CallToActionWithVideo() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            fontWeight="bold"
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            lineHeight="3"
          >
            <Text
              as={"span"}
              color="white"
              bgClip="text"
              bgGradient={useColorModeValue(
                "linear(to-tr, blue.200, purple.300)",
                "linear(to-tr, blue.200, purple.300)"
              )}
            >
              sushii
            </Text>
          </Heading>
          <Heading
            as="h2"
            size="md"
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.200")}
          >
            Multi-purpose bot with essential features for moderating Discord
            servers.
          </Heading>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              bg={useColorModeValue("blue.200", "blue.400")}
              _hover={{ bg: "blue.200" }}
            >
              Add to Discord
            </Button>
            <Link to="/commands">
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                leftIcon={<FiCommand color={"gray.300"} />}
              >
                View Commands
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={
                "https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
              }
            />
          </Box>
        </Flex>
      </Stack>
      <Box>
        <Statistics stats={botStats} />
      </Box>
    </Container>
  );
}
