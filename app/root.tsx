// root.tsx
import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import {
  ChakraProvider,
  Heading,
  Text,
  VStack,
  Box,
  ColorModeScript,
} from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node"; // Depends on the runtime you choose
import NProgress from "nprogress";
import nProgressStyles from "./nprogress.css";

// Fonts
import PoppinsCss400 from "@fontsource/poppins/400.css";
import PoppinsCss600 from "@fontsource/poppins/600.css";
import PoppinsCss700 from "@fontsource/poppins/700.css";

import { ServerStyleContext, ClientStyleContext } from "./context";
import theme from "./theme";
import Navbar from "./components/Navbar/Navbar";

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { title: "sushii.xyz" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: PoppinsCss400,
    },
    {
      rel: "stylesheet",
      href: PoppinsCss600,
    },
    {
      rel: "stylesheet",
      href: PoppinsCss700,
    },
    {
      rel: "stylesheet",
      href: nProgressStyles,
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <html
        lang="en"
        style={{
          height: "100%",
        }}
      >
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body style={{ minHeight: "100%", overflowY: "scroll" }}>
          <ColorModeScript initialColorMode="dark" />
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <VStack h="100vh" justify="center">
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </VStack>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document>
        <VStack h="100vh" justify="center">
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </VStack>
      </Document>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (navigation.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start();
  }, [navigation.state]);

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
