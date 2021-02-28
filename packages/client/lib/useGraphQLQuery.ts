import { createContext, useContext } from "react";

export const GraphQLRequest = createContext(undefined);

export function useGraphQLQuery() {
    return useContext(GraphQLRequest);
}
