import type { ButtonProps } from "@chakra-ui/react";
import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

export default function ColorModeToggle(props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    /**
     * Ideally, only the button component should be used (without Flex).
     * Props compatible with <Button /> are supported.
     */

    <Button
      aria-label="Toggle Color Mode"
      onClick={toggleColorMode}
      _focus={{ boxShadow: "none" }}
      w="fit-content"
      {...props}
    >
      {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  );
}
