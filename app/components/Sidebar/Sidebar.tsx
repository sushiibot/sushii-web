import { Box, useColorModeValue, List, ListItem } from "@chakra-ui/react";
import { useRef } from "react";
import type { SidebarCategoryProps } from "./SidebarCategory";
import { isCategory } from "./SidebarCategory";
import SidebarCategory from "./SidebarCategory";
import type { SidebarLinkProps } from "./SidebarLink";
import SidebarLink from "./SidebarLink";
import { useMatches } from "@remix-run/react";

type NavLinkProps = SidebarLinkProps | SidebarCategoryProps;

export interface SidebarProps {
  routes: NavLinkProps[];
}

const Sidebar = ({ routes }: SidebarProps) => {
  const matches = useMatches();
  const ref = useRef<HTMLDivElement>(null);

  console.log(matches);

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
      p="6"
      overflowY="auto"
      flexShrink={0}
      display={{ base: "none", md: "block" }}
      bg={useColorModeValue("gray.500", "gray.900")}
    >
      <List spacing="2" styleType="none">
        {routes.map((item) => (
          <ListItem key={item.label}>
            {isCategory(item) ? (
              <SidebarCategory label={item.label} links={item.links} />
            ) : (
              <SidebarLink label={item.label} href={item.href} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
