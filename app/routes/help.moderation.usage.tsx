import { Container, Heading, Text } from "@chakra-ui/react";

export default function Usage() {
  return (
    <Container p={0}>
      <Heading mb="4">Usage</Heading>
      <Text>
        To get started, the basic commands are as you might expect. You can ban,
        warn, and mute one or multiple members. Just pass more mentions or IDs
        and make sure your (optional) reason is after them! IDs and mentions can
        both be interchangeably used.
      </Text>
    </Container>
  );
}
