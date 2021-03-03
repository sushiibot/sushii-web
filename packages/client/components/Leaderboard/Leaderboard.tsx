import { useState } from "react";
import LeaderboardGuild from "./LeaderboardGuild";
import LeaderboardUserList from "./LeaderboardUserList";
import NextReset from "./NextReset";
import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { useLeaderboardQuery, LevelTimeframe } from "@sushii-web/graphql";

export interface GuildLeaderboardProps {
    guildId?: string;
}

const TIMEFRAME_STRS: { [key: string]: LevelTimeframe } = {
    "All Time": LevelTimeframe.AllTime,
    Month: LevelTimeframe.Month,
    Week: LevelTimeframe.Week,
    Day: LevelTimeframe.Day,
};

export default function Leaderboard({ guildId }: GuildLeaderboardProps) {
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
            <LeaderboardGuild guildId={guildId} />
            <div className="flex flex-wrap justify-evenly my-4">
                {Object.entries(TIMEFRAME_STRS).map(([name, value]) => (
                    <div key={name}>
                        <button
                            className={
                                "px-4 py-2 my-2 rounded-full hover:bg-gray-800 hover:text-white " +
                                (value === timeframe
                                    ? "border border-gray-900 bg-gray-900 text-blue-400"
                                    : "border border-gray-900 text-gray-400")
                            }
                            onClick={() => setTimeframe(value)}
                        >
                            {name}
                        </button>
                    </div>
                ))}
            </div>
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
