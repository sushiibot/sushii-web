import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme(
  {
    colors,
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
  },
  withProse()
);

export default theme;
