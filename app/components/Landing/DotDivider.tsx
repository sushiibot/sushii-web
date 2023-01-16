import { Box, HStack, useColorModeValue } from "@chakra-ui/react";

interface DotDividerProps {
  count: number;
}

export default function DotDivider({ count }: DotDividerProps) {
  const bgColor = useColorModeValue("gray.200", "gray.400");

  return (
    <HStack marginY="8" spacing={8}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Box
            key={i}
            width="1"
            height="1"
            rounded="full"
            backgroundColor={bgColor}
          />
        ))}
    </HStack>
  );
}
