import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Container
      marginTop={{ base: "4", md: "6" }}
      as="footer"
      role="contentinfo"
      maxW="8xl"
      paddingTop={{ base: "12", md: "16" }}
      paddingBottom={{ base: "6", md: "8" }}
    >
      <HStack alignItems={"end"} justify="space-between">
        <Stack spacing={{ base: "4", md: "5" }}>
          <Stack justify="space-between" direction="row" align="center">
            <ButtonGroup variant="ghost">
              <IconButton
                as="a"
                href="https://github.com/sushiibot"
                aria-label="GitHub"
                rel="noopener noreferrer"
                target="_blank"
                icon={<FaGithub fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="https://discord.gg/PjDRRXSSAF"
                aria-label="Discord"
                rel="noopener noreferrer"
                target="_blank"
                icon={<FaDiscord fontSize="1.25rem" />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm" color="subtle">
            sushii 2
            <br />
            Source code licensed AGPLv3
          </Text>
        </Stack>
        <Stack spacing={{ base: "4", md: "5" }}>
          <Text fontSize="sm" color="subtle">
            Terms of Service
            <br />
            <Link to="/privacy">Privacy Policy</Link>
          </Text>
        </Stack>
        <Box />
      </HStack>
    </Container>
  );
}
