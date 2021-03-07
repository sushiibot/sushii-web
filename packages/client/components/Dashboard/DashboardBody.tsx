import { useRouter } from "next/router";
import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { getGuildIconUrl } from "../../lib/discordCdn";
import {
    useGuildConfigQuery,
    useEditGuildConfigMutation,
} from "@sushii-web/graphql";
import { useQueryClient } from "react-query";
import Link from "next/link";
import Head from "next/head";

export default function DashboardBody() {
    const router = useRouter();
    const guildId = Array.isArray(router.query.guildId)
        ? router.query.guildId.join("")
        : router.query.guildId;

    const client = useGraphQLQuery();
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useGuildConfigQuery(client, {
        guildId,
    });

    const editConfigMutation = useEditGuildConfigMutation(client, {
        onSuccess: (data) => {
            // Invalidate guild config query to refetch
            queryClient.invalidateQueries("guildConfig");
            console.log("Edited guild config", data);
        },
        onError: (e) => {
            console.error("Error logging out:", editConfigMutation.error);
        },
    });

    if (!guildId || status === "loading") {
        return <div>Loading</div>;
    }

    if (!data.guildConfig) {
        return (
            <div>
                Error: Invalid server or you do not have permission to view this
                server.
            </div>
        );
    }

    const {
        guildConfig,
        guildConfig: { cachedGuildById: cachedGuild },
    } = data;

    return (
        <div>
            <Head>
                <title>{cachedGuild.name} Dashboard | sushii</title>
            </Head>
            <div className="flex items-center my-4">
                <img
                    className="w-14 h-14 mr-4 rounded-full"
                    src={getGuildIconUrl(guildId, cachedGuild.icon)}
                    alt="Guild Icon URL"
                />
                <h1 className="text-2xl">Dashboard {cachedGuild.name}</h1>
            </div>
            <div>prefix: {guildConfig.prefix || "-"}</div>
            {guildConfig.disabledChannels &&
                guildConfig.disabledChannels.map((chanId) => (
                    <div key={chanId}>{chanId}</div>
                ))}
        </div>
    );
}
