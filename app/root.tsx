import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { ColorScheme } from "@mantine/core";
import { Global } from "@mantine/core";
import {
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import { useState } from "react";
import { useColorScheme } from "@mantine/hooks";
import colors from "./colors";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "sushii",
  viewport: "width=device-width,initial-scale=1",
});

createEmotionCache({ key: "mantine" });

export default function App() {
  // Default "dark"
  const preferredColorScheme = useColorScheme("dark");
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, primaryColor: "blue" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Global
          styles={(theme) => ({
            body: {
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[0]
                  : theme.colors.gray[8],
              fontSize: 15,
              margin: 0,
            },
          })}
        />
        <html lang="en">
          <head>
            <StylesPlaceholder />
            <Meta />
            <Links />
          </head>
          <body style={{ margin: 0 }}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
