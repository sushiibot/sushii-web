import { defineStyle, extendTheme } from "@chakra-ui/react";
// import * as chakraUIProse from "@nikolovlazar/chakra-ui-prose";
import type { StyleFunctionProps } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

// const { withProse } = chakraUIProse.default;

const colors = {
  gray: {
    50: "#cdd6f4",
    100: "#bac2de",
    200: "#a6adc8",
    300: "#9399b2",
    400: "#7f849c",
    500: "#6c7086",
    600: "#313244",
    700: "#1e1e2e",
    800: "#181825",
    900: "#11111b",
    950: "#001220",
  },
  blue: {
    "50": "#EBF0FA",
    "100": "#C6D6F1",
    "200": "#A1BCE7",
    "300": "#7DA1DE",
    "400": "#5887D5",
    "500": "#336DCC",
    "600": "#2957A3",
    "700": "#1F417A",
    "800": "#152C51",
    "900": "#0A1629",
  },
};

const headingStyle = defineStyle({
  baseStyle: {
    fontWeight: "medium",
  },
});

const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    colors,
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
    components: {
      Heading: headingStyle,
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          bg: mode("gray.100", "gray.800")(props),
        },
      }),
    },
  }
  // withProse()
);

export default theme;
