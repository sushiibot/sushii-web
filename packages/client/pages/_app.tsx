import "../styles/index.css";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { useNProgress } from "@tanem/react-nprogress";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Progress from "../components/Progress";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GraphQLRequest } from "../lib/useGraphQLQuery";
import { GraphQLClient } from "graphql-request";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
    const client = useApollo(pageProps.initialApolloState);
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

    return (
        <ApolloProvider client={client}>
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
                        <Component {...pageProps} />
                        <Footer />
                        <svg
                            className="fixed top-0 left-0 object-cover -z-10 opacity-30"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                            viewBox="0 0 1440 560"
                        >
                            <g fill="none" mask='url("#SvgjsMask1021")'>
                                <path
                                    fill="rgba(19, 34, 49, 1)"
                                    d="M0 0H1440V560H0z"
                                ></path>
                                <path
                                    fill="#0f1b27"
                                    d="M0 664.066c123.021 15.597 240.636-61.967 336.019-141.21 88.692-73.684 131.222-182.715 179.772-287.302C564.649 130.303 650.352 22.871 620.123-89.16c-30.252-112.113-182.037-136.984-253.591-228.442-77.445-98.987-67.791-263.634-178.273-323.55-110.533-59.943-254.084-24.961-368.597 26.977-107.382 48.703-163.604 160.131-240.68 249.361-76.935 89.068-206.552 156.301-211.306 273.9-4.795 118.601 123.777 194.075 188.361 293.665 53.454 82.428 90.451 170.535 158.575 241.322C-200.377 532.407-121.622 648.646 0 664.066"
                                ></path>
                                <path
                                    fill="#17293b"
                                    d="M1440 1032.332c86.936-6.803 134.603-102.382 202.94-156.551 60.301-47.799 137.364-76.078 175.121-143.126 39.237-69.677 54.334-154.33 36.251-232.224-17.48-75.296-93.457-117.789-132.935-184.245-51.148-86.102-35.855-236.994-132.624-262.791-97.79-26.069-160.613 113.85-250.318 160.705-66.815 34.899-157.226 21.921-207.263 78.299-50.147 56.502-48.88 140.101-53.5 215.506-4.302 70.214 4.881 138.368 27.741 204.896 24.898 72.461 54.745 143.504 110.155 196.421 62.983 60.149 137.607 129.904 224.432 123.11"
                                ></path>
                            </g>
                            <defs>
                                <mask id="SvgjsMask1021">
                                    <path
                                        fill="#fff"
                                        d="M0 0H1440V560H0z"
                                    ></path>
                                </mask>
                            </defs>
                        </svg>
                    </div>
                    <ReactQueryDevtools initialIsOpen={false} />
                </GraphQLRequest.Provider>
            </QueryClientProvider>
        </ApolloProvider>
    );
}

export default App;
