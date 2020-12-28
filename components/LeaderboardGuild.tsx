import { gql, useQuery } from "@apollo/client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

export const LEADERBOARD_GUILD_QUERY = gql`
    query guildLeaderboard($guildId: BigInt!) {
        guild(guildId: $guildId) {
            name
            memberCount
            iconUrl
            features
            splashUrl
            bannerUrl
        }
    }
`;

export interface LeaderboardGuildProps {
    guildId?: string;
}

export interface LeaderboardGuildQueryVars {
    guildId: string;
}

export default function LeaderboardGuild({ guildId }: LeaderboardGuildProps) {
    if (guildId === undefined) {
        return <h1 className="text-4xl mt-4">Global Leaderboard</h1>;
    }

    const variables: LeaderboardGuildProps = {
        guildId,
    };

    const { loading, error, data } = useQuery(LEADERBOARD_GUILD_QUERY, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

    if (loading) {
        return <div className="h-6 w-20 bg-gray-800 pulse"></div>;
    }

    if (!data || error) {
        return <h1 className="text-4xl">Leaderboard</h1>;
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
            <div className="flex items-center">
                <img
                    className="w-20 h-20 mr-4 rounded-full"
                    src={data.guild.iconUrl}
                    alt="Guild Icon URL"
                />
                <h1 className="text-4xl">
                    {data?.guild.name ? data.guild.name : guildId} Leaderboard
                </h1>
            </div>
        </div>
    );
}
