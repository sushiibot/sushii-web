import { Box, Container, HStack } from "@chakra-ui/react";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";
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

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

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
