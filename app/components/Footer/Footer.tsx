import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
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
    </Container>
  );
}
