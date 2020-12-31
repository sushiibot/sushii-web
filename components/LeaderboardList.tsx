import { gql, useQuery, NetworkStatus } from "@apollo/client";
import LeaderboardUser from "./LeaderboardUser";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import LeaderboardUserPlaceholder from "./LeaderboardUserPlaceholder";
import LeaderboardGuild from "./LeaderboardGuild";
import NextReset from "./NextReset";

export const LEADERBOARD_QUERY = gql`
    query guildLeaderboard(
        $guildId: BigInt
        $timeframe: TimeFrame!
        $first: BigInt!
        $after: String
    ) {
        userXpLeaderboardConnection(
            guildId: $guildId
            timeframe: $timeframe
            first: $first
            after: $after
        ) {
            totalCount
            edges {
                node {
                    userId
                    xp
                    xpDiff
                    timeframeGainedLevels
                    xpProgress {
                        level
                        nextLevelXpRequired
                        nextLevelXpProgress
                        nextLevelXpPercentage
                    }
                    user {
                        name
                        discriminator
                        avatarUrl
                    }
                }
                cursor
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
        }
    }
`;

export interface GuildLeaderboardProps {
    guildId?: string;
}

export interface LeaderboardQueryVars {
    guildId?: string;
    timeframe: "ALL_TIME" | "MONTH" | "WEEK" | "DAY";
    first?: string;
}

export const defaultLeaderboardQueryVars: LeaderboardQueryVars = {
    timeframe: "ALL_TIME",
    first: "50",
};

const animation_list: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
};

const TIMEFRAME_STRS: { [key: string]: LeaderboardQueryVars["timeframe"] } = {
    "All Time": "ALL_TIME",
    Month: "MONTH",
    Week: "WEEK",
    Day: "DAY",
};

export default function LeaderboardList({ guildId }: GuildLeaderboardProps) {
    const [timeframe, setTimeframe] = useState<
        LeaderboardQueryVars["timeframe"]
    >("ALL_TIME");

    const variables: LeaderboardQueryVars = {
        ...defaultLeaderboardQueryVars,
        timeframe,
        guildId,
    };

    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        LEADERBOARD_QUERY,
        {
            variables,
            // Setting this value to true will make the component rerender when
            // the "networkStatus" changes, so we are able to know if it is fetching
            // more data
            notifyOnNetworkStatusChange: true,
        }
    );

    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

    const loadMorePosts = () => {
        fetchMore({
            variables: {
                // Get last element's cursor
                after: edges[edges.length - 1].cursor,
            },
        });
    };

    const { totalCount, edges } = data?.userXpLeaderboardConnection || {};

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
            {
                // error persists after requesting another timeframe for some reason, so
                // only show error if data is also null
                !!error && !data ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <div>
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={animation_list}
                        >
                            {loading && !loadingMorePosts
                                ? Array(10)
                                      .fill(null)
                                      .map((_, i) => (
                                          <LeaderboardUserPlaceholder
                                              key={i}
                                              i={i}
                                          />
                                      ))
                                : edges.map(({ node }: any, i: number) => (
                                      <LeaderboardUser
                                          key={node.userId}
                                          node={node}
                                          guildId={guildId}
                                          i={i}
                                      />
                                  ))}
                        </motion.ul>
                        {edges !== undefined && edges.length < totalCount && (
                            <button
                                onClick={() => loadMorePosts()}
                                disabled={loadingMorePosts}
                            >
                                {loadingMorePosts ? "Loading..." : "Show More"}
                            </button>
                        )}
                    </div>
                )
            }
        </section>
    );
}
