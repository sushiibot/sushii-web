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
  Image,
  Spacer,
  useOutsideClick,
} from "@chakra-ui/react";
import { FiTrendingUp, FiBook, FiCommand, FiMenu } from "react-icons/fi";
import ColorModeToggle from "../ColorModeToggle/ColorModeToggle";
import { Link, NavLink, useMatches } from "@remix-run/react";
import SushiiIcon from "../../images/sushii.png";
import { botInviteURL } from "~/consts";
import { useRef } from "react";

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
  const bg = useColorModeValue("white", "blackalpha.900");
  const mobileNav = useDisclosure();
  const matches = useMatches();

  // First element is root
  const showSubnav = matches.at(1)?.pathname === "/server";

  const ref = useRef<typeof HStack>(null);
  useOutsideClick({
    ref: ref,
    handler: () => mobileNav.onClose(),
  });

  const invitebutton = (
    <a href={botInviteURL} rel="noopener noreferrer" target="_blank">
      <Button
        fontWeight="medium"
        bgGradient={useColorModeValue(
          "linear(to-tr, blue.200, purple.300)",
          "linear(to-tr, blue.400, purple.600)"
        )}
        _hover={{
          bgGradient: useColorModeValue(
            "linear(to-tr, blue.200, purple.300)",
            "linear(to-tr, blue.500, purple.700)"
          ),
        }}
      >
        Invite sushii
      </Button>
    </a>
  );

  return (
    <Box>
      {/** spacer */}
      <Box height="16" />
      <Box shadow="md" position="fixed" top="0" w="full" zIndex={10}>
        <chakra.header
          bg={bg}
          backdropFilter="auto"
          backdropBlur="6px"
          borderBottomWidth={1}
          w="full"
          p={4}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mx="auto"
            w="full"
            maxW="8xl"
          >
            <Flex alignItems="center" w="full">
              <Link to="/" title="Home">
                <Box display="flex" alignItems="center">
                  <Image src={SushiiIcon} height="8" marginRight="2" />
                  <Heading fontSize="2xl" fontWeight="medium">
                    sushii
                  </Heading>
                  <VisuallyHidden>sushii</VisuallyHidden>
                </Box>
              </Link>
              <Spacer />
              {/** mobile hamburger button */}
              {mobileNav.isOpen ? (
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                  size="lg"
                  variant="ghost"
                />
              ) : (
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
              )}

              {/** mobile nav */}
              <Box display={{ base: "inline-flex", md: "none" }}>
                {/** mobile nav items */}
                <VStack
                  ref={ref}
                  pos="absolute"
                  top="16"
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  width="full"
                  p={4}
                  pb={4}
                  backdropFilter="auto"
                  backdropBlur="6px"
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                  alignItems="start"
                  borderBottom="1px solid"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                >
                  {links.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.href}
                      onClick={mobileNav.onClose}
                    >
                      <Button w="full" variant="ghost" leftIcon={<link.icon />}>
                        {link.label}
                      </Button>
                    </NavLink>
                  ))}
                  {invitebutton}
                </VStack>
              </Box>
            </Flex>
            <HStack spacing={3} display="flex" alignItems="center">
              {/** desktop nav */}
              <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
                {links.map((link) => (
                  <NavLink key={link.label} to={link.href}>
                    <Button
                      variant="ghost"
                      leftIcon={<link.icon />}
                      size="md"
                      fontWeight="medium"
                    >
                      {link.label}
                    </Button>
                  </NavLink>
                ))}
                {invitebutton}
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
    </Box>
  );
}
