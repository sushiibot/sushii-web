import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { useCachedGuildQuery } from "@sushii-web/graphql";
import Head from "next/head";

export interface LeaderboardGuildProps {
    guildId?: string;
}

export default function LeaderboardGuild({ guildId }: LeaderboardGuildProps) {
    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useCachedGuildQuery(client, {
        guildId,
    });

    if (!guildId) {
        return <h1 className="text-4xl mt-4">Global Leaderboard</h1>;
    }

    if (status === "loading") {
        return <div className="h-6 w-20 bg-gray-800 pulse"></div>;
    }

    return (
        <div>
            {/* Don't know what to do with banner yet since it's small
             data.guild.bannerUrl && (
                <img
                    className="h-48 mb-4 rounded"
                    src={data.guild.bannerUrl}
                    alt="Banner URL"
                />
            ) */}
            <Head>
                <title>{data.cachedGuild.name} Leaderboard | sushii 2</title>
            </Head>
            <div className="flex items-center">
                <img
                    className="w-20 h-20 mr-4 rounded-full"
                    src={data.cachedGuild.iconUrl}
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
