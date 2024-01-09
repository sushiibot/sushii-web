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
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import SvgBlurryBackground from "../../images/blurry-gradient-haikei.svg";
import SvgBlobTopRight from "../../images/blob-scene-haikei.svg";
import SvgBlobBottomLeft from "../../images/blob-bottom-left.svg";
import SvgWaveDivider from "../../images/stacked-waves.svg";
import { Link, useLoaderData } from "@remix-run/react";
import {
  FiCommand,
  FiUsers,
  FiChevronsUp,
  FiMessageSquare,
  FiTag,
} from "react-icons/fi/index.js";
import TextCard from "~/components/Card/TextCard";
import type { StatsCardProps } from "~/components/Statistics/Staticstic";
import Statistics from "~/components/Statistics/Staticstic";
import { botInviteURL } from "~/consts";
import DotDivider from "~/components/Landing/DotDivider";
import Footer from "~/components/Footer/Footer";
import db from "~/db/database.server";
import type { TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import logger from "~/logger";
import { getAllBotStats } from "../../db/BotStats/BotStat.repository.server";

const IMAGE =
  "https://cdn.discordapp.com/attachments/740618628285857843/1085621666605965432/PXL_20230228_204948938.jpg";

export async function loader(): Promise<TypedResponse<StatsCardProps[]>> {
  const stats = await getAllBotStats(db);

  logger.info({ stats }, "Stats");

  const minStats = stats.map((stat): StatsCardProps => {
    return {
      name: stat.name,
      value: stat.count,
    };
  });

  return json(minStats);
}

export default function Index() {
  const stats = useLoaderData<typeof loader>();

  return (
    <Box minHeight="full">
      <Box position="relative">
        <Container maxW={"5xl"}>
          <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
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
                lineHeight="normal"
                color={useColorModeValue("gray.700", "white")}
              >
                Essential features for moderating Discord servers.
              </Heading>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                <a
                  href={botInviteURL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button
                    size={"lg"}
                    fontWeight={"normal"}
                    px={6}
                    bg={useColorModeValue("blue.200", "blue.400")}
                    _hover={{ bg: useColorModeValue("blue.300", "blue.500") }}
                    boxShadow={"0 8px 15px 0px rgb(66 153 225 / 43%)"}
                  >
                    Add to Discord
                  </Button>
                </a>
                <Link to="/commands">
                  <Button
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
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${IMAGE})`,
                  filter: "blur(36px)",
                  opacity: 0.3,
                  zIndex: -1,
                }}
              >
                <Image
                  alt={"Hero Image"}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={"100%"}
                  src={IMAGE}
                  rounded={"2xl"}
                />
              </Box>
            </Flex>
          </Stack>
          <Box marginBottom="32">
            <Statistics stats={stats} />
          </Box>
        </Container>
        <Image
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          width="full"
          height="full"
          zIndex={-5}
          filter="blur(64px)"
          src={SvgBlurryBackground}
        />
      </Box>
      {/** outside of box to be absolute to doc, not parent */}
      <Image
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        width="100vw"
        zIndex={-4}
        src={SvgBlobTopRight}
      />
      <Box position="relative">
        {/** waves divider */}
        <Image
          position="absolute"
          top="-36"
          left={0}
          width="full"
          zIndex={-3}
          src={SvgWaveDivider}
        />
        <Container maxW={"8xl"}>
          <Center marginBottom="6">
            <DotDivider count={3} />
          </Center>
          <Heading
            as="h2"
            size="md"
            color={useColorModeValue("blue.200", "blue.200")}
            marginBottom="4"
            fontWeight="medium"
          >
            Features
          </Heading>
          <Heading as="h2" marginBottom="4">
            Why sushii?
          </Heading>
          <Container margin={0} marginBottom="16" padding={0}>
            <Text fontSize="xl">
              A bundle of features that are essential to any server, along with
              a few extras.
            </Text>
          </Container>
          {/** feature cards */}
          <SimpleGrid
            spacing="6"
            columns={{ base: 2, md: 4 }}
            marginBottom="24"
          >
            <TextCard
              title="Moderation tools"
              description="Logging for moderation actions, deleted messages, etc. Keep track of past infractions for users."
              icon={FiMessageSquare}
            />
            <TextCard
              title="XP and Levels"
              description="Encourage your members to chat with activity rankings and leaderboard. Reward active users with roles given at certain levels."
              icon={FiChevronsUp}
            />
            <TextCard
              title="Role Menus"
              description="Easy self-assigned roles with buttons or select-menus."
              icon={FiUsers}
            />
            <TextCard
              title="Custom Tags"
              description="Create your own tags for quick access to your favorite messages."
              icon={FiTag}
            />
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
      <Image
        position="absolute"
        left={0}
        bottom={0}
        width="100vw"
        zIndex={-2}
        src={SvgBlobBottomLeft}
      />
    </Box>
  );
}
