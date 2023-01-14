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
    href: "/help/moderation",
    links: [
      {
        label: "Setup",
        href: "/help/moderation/setup",
      },
    ],
  },
  {
    label: "Roles",
    href: "/help/roles",
  },
];

export default function Help() {
  return (
    <Container mx="auto" w="full" maxW="8xl">
      <HStack alignItems="start">
        <Sidebar title="Categories" routes={routes} />
        <Box p="4">
          <Prose>
            <Outlet />
          </Prose>
        </Box>
      </HStack>
    </Container>
  );
}
