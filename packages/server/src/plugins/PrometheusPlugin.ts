import { gql, makeExtendSchemaPlugin } from "graphile-utils";

import { OurGraphQLContext } from "../middleware/installPostGraphile";
import fetch from "node-fetch";

// http://localhost:9090/api/v1/ with trailing slash
const PROMETHEUS_API_URL = process.env.PROMETHEUS_API_URL;

if (!PROMETHEUS_API_URL) {
    throw new Error("PROMETHEUS_API_URL not in environment");
}

const PrometheusPlugin = makeExtendSchemaPlugin((build) => ({
    typeDefs: gql`
        union resultType = "matrix" | "vector" | "scalar" | "string"
        scalar Object

        type Statistic {
            resultType: resultType!
            result: Object!
        }

        type Statistics {
            server_count: Statistics!
            user_count: Statistics!
            commands_count: Statistics!
        }

        extend type Query {
            """
            Use this mutation to logout from your account. Don't forget to clear the client state!
            """
            statistics: Statistics
        }
    `,
    resolvers: {
        Query: {
            async statistics(context: OurGraphQLContext, _resolveInfo) {
                const res = await fetch(
                    PROMETHEUS_API_URL + "query?query=sushii_guilds"
                ).then((r) => r.json());

                return res.json();
            },
        },
    },
}));

export default PrometheusPlugin;
