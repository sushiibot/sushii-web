import {
  Avatar,
  Box,
  HStack,
  Progress,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export interface LeaderboardUserProps {
  userId: string;
  rank: number;
  username: string;
  avatarHash?: string;
  discriminator: string;
  level: string;
  xpProgress: number;
  xpTotal: number;
}

export default function LeaderboardUser({
  userId,
  rank,
  username,
  avatarHash,
  discriminator,
  level,
  xpProgress,
  xpTotal,
}: LeaderboardUserProps) {
  return (
    <Box
      p="6"
      marginY="2"
      width="full"
      rounded="xl"
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      _hover={{
        backgroundColor: useColorModeValue("gray.100", "gray.700"),
      }}
    >
      <HStack>
        <Box width={["lg", "sm"]}>
          <HStack>
            <Text
              px="2"
              py="1"
              rounded="md"
              bgColor={useColorModeValue("gray.300", "gray.900")}
            >
              #{rank}
            </Text>
            <Avatar
              size="lg"
              src={
                avatarHash
                  ? `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.webp?size=4096`
                  : `https://cdn.discordapp.com/embed/avatars/${
                      parseInt(discriminator) % 5
                    }.png`
              }
            />
            <Text>
              {username}
              <Text as="span" color={useColorModeValue("gray.300", "gray.500")}>
                #{discriminator}
              </Text>
            </Text>
          </HStack>
        </Box>
        <VStack width="full" alignItems="start">
          <Box>
            {xpProgress} / {xpTotal} XP
          </Box>
          <Progress
            rounded="full"
            colorScheme="blue"
            size="sm"
            width="full"
            value={(xpProgress / xpTotal) * 100}
          />
        </VStack>
        <Box p="2">
          <Text>
            Level
            <br />
            {level}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}
