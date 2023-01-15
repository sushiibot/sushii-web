import { Container, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

export default function Guide() {
  return (
    <Container p={0}>
      <Heading mb="4">Getting Started</Heading>
      <Text>
        First things first! You'll need to invite sushii to your server. You can
        do this by clicking the button below.
      </Text>
      <br />
      <Text>
        Make sure sushii's automatically created role is in the correct
        position. It should be above the roles for users you want sushii to
        apply actions to, ie bans, mutes, auto assigns, etc.
      </Text>

      <Heading my="4" size="lg">
        Still need some help?
      </Heading>
      <Link to="https://discord.gg/PjDRRXSSAF">
        <ChakraLink>Join the support server</ChakraLink>
      </Link>
    </Container>
  );
}
