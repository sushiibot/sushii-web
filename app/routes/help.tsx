import { Box, Container, HStack } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { Outlet } from "@remix-run/react";
import type { SidebarProps } from "~/components/Sidebar/Sidebar";
import Sidebar from "~/components/Sidebar/Sidebar";

const routes: SidebarProps["routes"] = [
  {
    label: "Getting Started",
    href: "/help",
  },
  {
    label: "Moderation",
    links: [
      {
        label: "Setup",
        href: "/help/moderation/setup",
      },
      {
        label: "Usage",
        href: "/help/moderation/usage",
      },
    ],
  },
  {
    label: "Role Menus",
    href: "/help/roles",
  },
  {
    label: "XP and Levels",
    href: "/help/levels",
  },
];

export default function Help() {
  return (
    <Container mx="auto" w="full" maxW="8xl">
      <HStack alignItems="start">
        <Sidebar routes={routes} />
        <Box p={8} as="main" className="main-content">
          <Outlet />
        </Box>
      </HStack>
    </Container>
  );
}
