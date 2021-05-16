import { useState } from "react";
import LeaderboardGuild from "./LeaderboardGuild";
import LeaderboardUserList from "./LeaderboardUserList";
import NextReset from "./NextReset";
import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { useLeaderboardQuery, LevelTimeframe } from "@sushii-web/graphql";
import { motion, AnimateSharedLayout } from "framer-motion";

export interface GuildLeaderboardProps {
    guildId?: string;
    routerIsLoading?: boolean;
}

const TIMEFRAME_STRS: { [key: string]: LevelTimeframe } = {
    "All Time": LevelTimeframe.AllTime,
    Month: LevelTimeframe.Month,
    Week: LevelTimeframe.Week,
    Day: LevelTimeframe.Day,
};

export default function Leaderboard({
    guildId,
    routerIsLoading,
}: GuildLeaderboardProps) {
    const [timeframe, setTimeframe] = useState<LevelTimeframe>(
        LevelTimeframe.AllTime
    );

    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useLeaderboardQuery(client, {
        timeframe,
        guildId,
    });

    return (
        <section>
            <h1 className="text-4xl font-medium">Server Leaderboard</h1>
            <AnimateSharedLayout>
                <motion.ul className="flex flex-wrap my-6 border-b border-gray-700">
                    {Object.entries(TIMEFRAME_STRS).map(([name, value]) => (
                        <motion.li key={name} className="mr-4 group">
                            <button
                                className={
                                    "focus:outline-none px-4 py-4 border-gray-900  \
                                    text-gray-400  border-b-2" +
                                    (value === timeframe
                                        ? " text-blue-400"
                                        : " hover:text-white")
                                }
                                onClick={() => setTimeframe(value)}
                            >
                                {name}
                            </button>
                            {value === timeframe ? (
                                <motion.div
                                    layout
                                    transition={{
                                        duration: 0.3,
                                        ease: "circOut",
                                    }}
                                    className="w-full h-px bg-blue-400"
                                    layoutId="underline"
                                />
                            ) : (
                                <div className="w-full h-px group-hover:bg-white" />
                            )}
                        </motion.li>
                    ))}
                </motion.ul>
            </AnimateSharedLayout>
            <NextReset timeframe={timeframe} />
            <LeaderboardUserList
                data={data}
                guildId={guildId}
                loading={status === "loading"}
            />
            {
                // error persists after requesting another timeframe for some reason, so
                // only show error if data is also null
                error && <div>Error: {error}</div>
            }
        </section>
    );
}
