import { gql, makeExtendSchemaPlugin } from "graphile-utils";

import { OurGraphQLContext } from "../middleware/installPostGraphile";

const PassportLoginPlugin = makeExtendSchemaPlugin((build) => ({
    typeDefs: gql`
        type LogoutPayload {
            success: Boolean
        }

        extend type Mutation {
            """
            Use this mutation to logout from your account. Don't forget to clear the client state!
            """
            logout: LogoutPayload
        }
    `,
    resolvers: {
        Mutation: {
            async logout(
                _mutation,
                _args,
                context: OurGraphQLContext,
                _resolveInfo
            ) {
                const { pgClient, logout } = context;
                await pgClient.query("select app_public.logout();");
                await logout();
                return {
                    success: true,
                };
            },
        },
    },
}));

export default PassportLoginPlugin;
