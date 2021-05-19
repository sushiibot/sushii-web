import "../styles/index.scss";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Progress from "../components/Progress";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GraphQLRequest } from "../lib/useGraphQLQuery";
import { GraphQLClient } from "graphql-request";

const queryClient = new QueryClient();

interface AppPropsE {
    Component: AppProps["Component"] & {
        getLayout: (page: JSX.Element) => JSX.Element;
    };
    pageProps: AppProps["pageProps"];
}

function App({ Component, pageProps }: AppPropsE) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setIsLoading(true);
        };

        const handleRouteChangeComplete = () => {
            setIsLoading(false);
        };

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, []);

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <QueryClientProvider client={queryClient}>
            <GraphQLRequest.Provider value={new GraphQLClient("/graphql")}>
                <Progress isAnimating={isLoading} key={router.pathname} />
                <div className="flex flex-col min-h-screen">
                    <Head>
                        <link rel="icon" href="/favicon.ico" />
                        <meta content="sushii 2" property="og:title" />
                        <meta
                            content="Moderation bot for Discord"
                            property="og:description"
                        />
                        <meta
                            content="/images/sushii.png"
                            property="og:image"
                        />
                        <link
                            rel="apple-touch-icon"
                            sizes="180x180"
                            href="/apple-touch-icon.png"
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            sizes="32x32"
                            href="/favicon-32x32.png"
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            sizes="16x16"
                            href="/favicon-16x16.png"
                        />
                        <link rel="manifest" href="/site.webmanifest" />
                        <link
                            rel="mask-icon"
                            href="/safari-pinned-tab.svg"
                            color="#5bbad5"
                        />
                        <meta
                            name="msapplication-TileColor"
                            content="#3b82f6"
                        />
                        <meta name="theme-color" content="#3b82f6" />
                        <script
                            async
                            defer
                            data-domain="sushii.xyz"
                            src="https://analytics.sushii.xyz/js/plausible.js"
                        ></script>
                    </Head>
                    <Nav />
                    {getLayout(<Component {...pageProps}></Component>)}
                    <Footer />
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
            </GraphQLRequest.Provider>
        </QueryClientProvider>
    );
}

export default App;
