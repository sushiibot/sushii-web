// root.tsx
import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import {
  ChakraProvider,
  Heading,
  Text,
  VStack,
  cookieStorageManagerSSR,
  localStorageManager,
  Box,
} from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node"; // Depends on the runtime you choose

// Fonts
import PoppinsCss400 from "@fontsource/poppins/400.css";
import PoppinsCss600 from "@fontsource/poppins/600.css";
import PoppinsCss700 from "@fontsource/poppins/700.css";

import { ServerStyleContext, ClientStyleContext } from "./context";
import theme from "./theme";
import Navbar from "./components/Navbar/Navbar";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "sushii.xyz",
  viewport: "width=device-width,initial-scale=1",
});

export let links: LinksFunction = () => {
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
    }, [clientStyleData, emotionCache.sheet]);

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
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document>
      <VStack h="100vh" justify="center">
        <Heading>There was an error</Heading>
        <Text>{error.message}</Text>
        <hr />
        <Text>
          Hey, developer, you should replace this with what you want your users
          to see.
        </Text>
      </VStack>
    </Document>
  );
}

export function CatchBoundary() {
  const cookies = useLoaderData();
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </Text>
      );
      break;
    case 404:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that does not exist.
        </Text>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          typeof cookies === "string"
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Navbar />
        <Box>
          <Heading>
            {caught.status} {caught.statusText}
          </Heading>
          {message}
        </Box>
      </ChakraProvider>
    </Document>
  );
}

// Typescript
// This will return cookies
export const loader: LoaderFunction = async ({ request }) => {
  // first time users will not have any cookies and you may not return
  // undefined here, hence ?? is necessary
  return request.headers.get("cookie") ?? "";
};

export default function App() {
  const cookies = useLoaderData();

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          typeof cookies === "string"
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Navbar />
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
