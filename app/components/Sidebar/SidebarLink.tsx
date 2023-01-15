import { Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";

export interface SidebarLinkProps {
  href: string;
  label: string;
}

export default function SidebarLink({ href, label }: SidebarLinkProps) {
  const linkActive = useColorModeValue("blue.200", "blue.400");
  const linkhover = useColorModeValue("blue.200", "blue.400");

  return (
    <NavLink to={href} end>
      {({ isActive }) => (
        <Text
          paddingY="1"
          paddingX="3"
          borderRadius="md"
          bg={isActive ? linkActive : undefined}
          _hover={{
            bg: linkhover,
          }}
          transition="background-color 0.1s ease"
        >
          {label}
        </Text>
      )}
    </NavLink>
  );
}
