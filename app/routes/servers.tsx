import { Outlet, useParams } from "@remix-run/react";
import {
  createStyles,
  Header,
  AppShell,
  Title,
  Text,
  useMantineTheme,
  MediaQuery,
  Aside,
  Burger,
} from "@mantine/core";
import { IconTrendingUp, IconTag } from "@tabler/icons";
import ThemeToggleButton from "../components/ThemeToggleButton/ThemeToggleButton";
import { useState } from "react";
import type { LinkData } from "~/components/SideNavbar/SideNavbar";
import SideNavbar from "~/components/SideNavbar/SideNavbar";
import type { LoaderFunction } from "@remix-run/node";
import isValidId from "~/utils/isValidId";
import type { HeaderProps } from "~/components/Header/Header";
import { HeaderAction } from "~/components/Header/Header";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.guildId) {
    throw new Response("Guild ID not provided", { status: 404 });
  }

  if (!isValidId(params.guildId)) {
    throw new Response("Invalid guild ID", { status: 404 });
  }

  return null;
};

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const headerLinks: HeaderProps["links"] = [
  {
    label: "Commands",
    link: "/commands",
  },
  {
    label: "Documentation",
    link: "/docs",
    links: [
      {
        label: "Getting Started",
        link: "/docs/getting-started",
      },
      {
        label: "Moderation",
        link: "/docs/moderation",
      },
      {
        label: "Role Menus",
        link: "/docs/role-menu",
      },
    ],
  },
];

export default function Servers() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const params = useParams();

  const links: LinkData[] = [
    {
      link: `/servers/${params.guildId}/leaderboard`,
      label: "Leaderboard",
      icon: IconTrendingUp,
    },
    { link: `/servers/${params.guildId}/tags`, label: "Tags", icon: IconTag },
  ];

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<SideNavbar links={links} hidden={!opened} />}
      header={<HeaderAction links={headerLinks} />}
    >
      <Outlet />
    </AppShell>
  );
}
