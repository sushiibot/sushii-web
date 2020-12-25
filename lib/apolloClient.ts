import { IncomingMessage, ServerResponse } from "http";
import { useMemo } from "react";
import {
    HttpLink,
    Reference,
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const GRAPHQL_API_URL =
    process.env.NODE_ENV === "development" ? "http://127.0.0.1:8080" : "";

export type ResolverContext = {
    req?: IncomingMessage;
    res?: ServerResponse;
};

function createApolloClient(context?: ResolverContext) {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: GRAPHQL_API_URL,
            credentials: "same-origin",
        }),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        // Bottom of this page
                        // https://www.apollographql.com/docs/react/pagination/key-args/#the-connection-directive
                        userXpLeaderboardConnection: relayStylePagination([
                            "guildId",
                        ]),
                    },
                },
            },
        }),
    });
}

export function initializeApollo(
    initialState: any = null,
    // Pages with Next.js data fetching methods, like `getStaticProps`, can send
    // a custom context which will be used by `SchemaLink` to server render pages
    context?: ResolverContext
) {
    const _apolloClient = apolloClient ?? createApolloClient(context);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: any
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
