import { gql, useQuery, NetworkStatus } from "@apollo/client";
import LeaderboardUser from "./LeaderboardUser";
import { motion, Variants } from "framer-motion";

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
                    xp
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

const list: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
};

export default function LeaderboardList({ guildId }: GuildLeaderboardProps) {
    const variables: LeaderboardQueryVars = {
        ...defaultLeaderboardQueryVars,
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

    if (error) return <div>Error: {error.message}</div>;
    if (loading && !loadingMorePosts) return <div>Loading</div>;

    const { totalCount, edges } = data.userXpLeaderboardConnection;
    const areMorePosts = edges.length < totalCount;

    return (
        <section>
            <motion.ul initial="hidden" animate="visible" variants={list}>
                {edges.map(({ node, cursor }: any, i: number) => (
                    <LeaderboardUser key={cursor} node={node} i={i} />
                ))}
            </motion.ul>
            {areMorePosts && (
                <button
                    onClick={() => loadMorePosts()}
                    disabled={loadingMorePosts}
                >
                    {loadingMorePosts ? "Loading..." : "Show More"}
                </button>
            )}
        </section>
    );
}
