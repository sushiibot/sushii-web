import { createStyles, Divider, Navbar } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons";
import { NavLink } from "@remix-run/react";
import { ServerCard } from "../ServerCard/ServerCard";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[2]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      marginBottom: 4,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color:
          theme.colorScheme === "dark"
            ? theme.colors.gray[0]
            : theme.colors.gray[7],
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

export interface LinkData {
  link: string;
  label: string;
  icon: TablerIcon;
}

interface SideNavbarProps {
  links: LinkData[];
  hidden: boolean;
}

export default function SideNavbar({ hidden, links }: SideNavbarProps) {
  const { classes, cx } = useStyles();

  const linkElements = links.map((item) => (
    <NavLink
      key={item.label}
      to={item.link}
      className={({ isActive }) =>
        cx(classes.link, {
          [classes.linkActive]: isActive,
        })
      }
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar
      width={{ sm: 300 }}
      p="md"
      hidden={hidden}
      sx={{ background: "none" }}
    >
      <Navbar.Section>
        <ServerCard
          name="BLACKPINK"
          avatar="https://cdn.discordapp.com/icons/187450744427773963/a_02c1b447d2444a57afef0c57d993470e.gif"
          banner="https://cdn.discordapp.com/banners/187450744427773963/a_68f6c4c788588e0966aada251f405bb4.gif?size=1024"
          stats={[
            { label: "Members", value: "140k" },
            { label: "Tags", value: "40" },
          ]}
        />
      </Navbar.Section>
      <Divider my="lg" />
      <Navbar.Section grow>{linkElements}</Navbar.Section>
    </Navbar>
  );
}
