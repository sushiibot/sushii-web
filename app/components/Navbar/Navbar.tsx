import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Tabs,
  TabList,
  Tab,
  Heading,
} from "@chakra-ui/react";
import { FiTrendingUp, FiBook, FiCommand, FiMenu } from "react-icons/fi";
import ColorModeToggle from "../ColorModeToggle/ColorModeToggle";
import { Link, NavLink, useMatches } from "@remix-run/react";

const links = [
  {
    label: "Commands",
    icon: FiCommand,
    href: "/commands",
  },
  {
    label: "Help",
    icon: FiBook,
    href: "/help",
  },
  {
    label: "Leaderboard",
    icon: FiTrendingUp,
    href: "/leaderboard",
  },
];

export default function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const matches = useMatches();

  // First element is root
  const showSubnav = matches.at(1)?.pathname === "/server";

  return (
    <Box shadow="md">
      <chakra.header
        bg={bg}
        backdropFilter="auto"
        backdropBlur="6px"
        borderBottomWidth={1}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
          w="full"
          maxW="8xl"
        >
          <HStack spacing={4} display="flex" alignItems="center">
            {/** mobile nav */}
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<FiMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                {links.map((link) => (
                  <NavLink key={link.label} to={link.href}>
                    <Button w="full" variant="ghost" leftIcon={<link.icon />}>
                      {link.label}
                    </Button>
                  </NavLink>
                ))}
              </VStack>
            </Box>
            <Link to="/" title="Home">
              <Box display="flex" alignItems="center">
                <Heading fontSize="2xl" fontWeight="medium">
                  sushii
                </Heading>
                <VisuallyHidden>sushii</VisuallyHidden>
              </Box>
            </Link>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            {/** desktop nav */}
            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              {links.map((link) => (
                <NavLink key={link.label} to={link.href}>
                  <Button variant="ghost" leftIcon={<link.icon />} size="sm">
                    {link.label}
                  </Button>
                </NavLink>
              ))}
            </HStack>
            <ColorModeToggle />
          </HStack>
        </Flex>
      </chakra.header>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx={2}
        borderWidth={0}
        overflowX="auto"
        hidden={!showSubnav}
      >
        <Tabs defaultIndex={1} borderBottomColor="transparent">
          <TabList>
            <Tab py={4} m={0} _focus={{ boxShadow: "none" }}>
              Basic
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: "none" }}>
              Integrations
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: "none" }}>
              Notifications
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: "none" }}>
              Usage
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: "none" }}>
              Billing
            </Tab>{" "}
            <Tab isDisabled py={4} m={0}>
              Advanced
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
    </Box>
  );
}
