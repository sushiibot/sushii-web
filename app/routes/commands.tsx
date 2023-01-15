import {
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { FiBell, FiClock, FiInfo, FiSettings, FiUser } from "react-icons/fi";
import TextCard from "~/components/Card/TextCard";
import type { SidebarProps } from "~/components/Sidebar/Sidebar";
import Sidebar from "~/components/Sidebar/Sidebar";

const routes: SidebarProps["routes"] = [
  {
    label: "Meta",
    href: "/commands#meta",
  },
  {
    label: "Settings",
    href: "/commands#settings",
  },
];

const categories = [
  {
    title: "Meta",
    description: "Related to sushii itself",
    icon: FiInfo,
    link: "/commands#meta",
  },
  {
    title: "Users",
    description: "Interact with other users",
    icon: FiUser,
    link: "/commands#users",
  },
  {
    title: "Notifications",
    description: "Manage keyword notifications",
    icon: FiBell,
    link: "/commands#notifications",
  },
  {
    title: "Reminders",
    description: "Set custom reminders",
    icon: FiClock,
    link: "/commands#reminders",
  },
  {
    title: "Settings",
    description: "Bot settings for your server",
    icon: FiSettings,
    link: "/commands#settings",
  },
];

export default function Commands() {
  return (
    <Container mx="auto" w="full" maxW="8xl">
      <HStack alignItems="start">
        <Sidebar routes={routes} />
        <Box p={4}>
          <Heading marginY="3">Commands</Heading>
          <Container marginLeft={0} paddingLeft={0} marginBottom="10">
            <Text>
              There are still a handful of commands that are being migrated over
              to slash commands. In the meantime, you can use the following
              commands for the ones that are not yet migrated.
            </Text>
          </Container>
          <Heading marginBottom="3" as="h3" size="lg">
            Categories
          </Heading>
          <Container marginLeft={0} paddingLeft={0} marginBottom="10">
            <Text>
              Click on a category to jump to one or find the full list by
              scrolling down.
            </Text>
          </Container>
          <SimpleGrid columns={[1, null, 4]} spacing={6}>
            {categories.map(({ link, ...category }) => (
              <Link to={link} key={category.title}>
                <TextCard {...category} height="full" />
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </HStack>
    </Container>
  );
}
