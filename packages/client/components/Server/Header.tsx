import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { useCachedGuildQuery } from "@sushii-web/graphql";
import { getGuildIconUrl } from "../../lib/discordCdn";

export interface GuildProps {
    guildId?: string;
    routerIsLoading: boolean;
}

export default function ServerHeader({ guildId, routerIsLoading }: GuildProps) {
    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useCachedGuildQuery(client, {
        guildId,
    });

    if (routerIsLoading) {
        return <div className="h-6 w-20 bg-gray-800 pulse"></div>;
    }

    if (!guildId) {
        return <h1 className="text-4xl mt-4">No Server ID was given</h1>;
    }

    if (status === "loading") {
        return <div className="h-6 w-20 bg-gray-800 pulse"></div>;
    }

    return (
        <div>
            <div className="flex items-center">
                <img
                    className="w-20 h-20 mr-4 rounded-full"
                    src={getGuildIconUrl(guildId, data.cachedGuild.icon)}
                    alt="Guild Icon URL"
                />
                <h1 className="text-4xl">
                    {data.cachedGuild ? data.cachedGuild.name : guildId}{" "}
                    Leaderboard
                </h1>
            </div>
        </div>
    );
}
