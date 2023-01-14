import { Heading, ListProps, Text, useColorModeValue } from "@chakra-ui/react";
import {
  Badge,
  Box,
  Center,
  chakra,
  HStack,
  List,
  ListItem,
} from "@chakra-ui/react";
import type { ReactElement, ReactNode } from "react";
import { Fragment, useRef } from "react";
import {
  FaFileAlt,
  FaPalette,
  FaTools,
  FaGlobe,
  FaCompass,
  FaReadme,
} from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import SidebarCategory from "./SidebarCategory";
import SidebarLink from "./SidebarLink";
import { Link, NavLink, useMatches } from "@remix-run/react";

interface NavLinkCategoryProps {
  href?: string;
  label: string;
  // Only 1 layer deep, no additional nesting
  links: NavLinkSingleProps[];
}

interface NavLinkSingleProps {
  href: string;
  label: string;
  links?: never;
}

type NavLinkProps = NavLinkSingleProps | NavLinkCategoryProps;

export interface SidebarProps {
  title?: string;
  routes: NavLinkProps[];
}

const Sidebar = ({ routes, title }: SidebarProps) => {
  const matches = useMatches();
  const ref = useRef<HTMLDivElement>(null);

  console.log(matches);

  const linkActive = useColorModeValue("blue.200", "blue.400");
  const linkhover = useColorModeValue("blue.200", "blue.400");

  return (
    <Box
      ref={ref}
      aria-label="Main Navigation"
      as="nav"
      pos="sticky"
      overscrollBehavior="contain"
      borderRadius="lg"
      marginTop="4"
      w="280px"
      h="calc(100vh - 8.125rem)"
      p="8"
      overflowY="auto"
      flexShrink={0}
      display={{ base: "none", md: "block" }}
      bg={useColorModeValue("gray.500", "gray.900")}
    >
      <List spacing="4" styleType="none">
        {title ? (
          <Heading as="h2" size="md" fontWeight="bold">
            {title}
          </Heading>
        ) : null}
        {routes.map((item) => (
          <ListItem key={item.label} marginTop="1">
            {item.href ? (
              <NavLink to={item.href} end>
                {({ isActive }) => (
                  <Text
                    paddingY="2"
                    paddingX="4"
                    margin={0}
                    borderRadius="md"
                    bg={isActive ? linkActive : undefined}
                    _hover={{
                      bg: linkhover,
                    }}
                  >
                    {item.label}
                  </Text>
                )}
              </NavLink>
            ) : (
              <>
                <Text>{item.label}</Text>
              </>
            )}
            {item.links &&
              item.links.map((link) => (
                <NavLink key={link.href} to={link.href} end>
                  {({ isActive }) => (
                    <Text
                      paddingY="2"
                      paddingX="4"
                      margin={0}
                      borderRadius="md"
                      bg={isActive ? linkActive : undefined}
                      _hover={{
                        bg: linkhover,
                      }}
                    >
                      {link.label}
                    </Text>
                  )}
                </NavLink>
              ))}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
