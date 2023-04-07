import { Container, Heading, Text } from "@chakra-ui/react";
import {
  DiscordCommand,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";

export default function Roles() {
  return (
    <Container p={0}>
      <Heading mb="4">Role Menus</Heading>
      <Text marginBottom="4">
        Allow your users to self-assign roles with sushii's role menus. This
        supports both buttons and select menus.
      </Text>
      <Text marginBottom="4">
        Why use these instead of Discord native role customize menu? You can set
        a limit on how many roles a user can have, and you can also add required
        roles needed for the menu.
      </Text>

      <DiscordMessages
        style={{
          borderRadius: "4px",
        }}
      >
        {/** Create menu */}
        <DiscordMessage author="User">
          Let's walk through the setup process! First things first, create a new
          role menu.
        </DiscordMessage>
        <DiscordMessage author="sushii">
          <DiscordCommand slot="reply" author="user" command="/rolemenu new" />
          Created a new role menu
        </DiscordMessage>

        {/** Add roles */}
        <DiscordMessage author="User">
          Now let's add some roles to the menu.
        </DiscordMessage>
        <DiscordMessage author="sushii">
          <DiscordCommand
            slot="reply"
            author="user"
            command="/rolemenu addroles"
          />
          Created a new role menu
        </DiscordMessage>

        {/** Role emojis and descriptions */}
        <DiscordMessage author="User">
          Want to add emojis to the role buttons? You can do that too! You can
          also add a description, but it will only show up for select menus.
        </DiscordMessage>
        <DiscordMessage author="sushii">
          <DiscordCommand
            slot="reply"
            author="user"
            command="/rolemenu roleoptions"
          />
          Added emojis and description to role
        </DiscordMessage>

        {/** send */}
        <DiscordMessage author="User">
          Now let's try out the menu by sending it. Here you can pick to send it
          with buttons or select menus.
        </DiscordMessage>
        <DiscordMessage author="sushii">
          <DiscordCommand slot="reply" author="user" command="/rolemenu send" />
          Sent role menu
        </DiscordMessage>

        {/** edit */}
        <DiscordMessage author="User">
          Want to change the roles? Just run the previous commands again, and
          make sure to re-send the menu when you are done with any changes.
        </DiscordMessage>
      </DiscordMessages>
    </Container>
  );
}
