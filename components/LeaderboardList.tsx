import { gql, useQuery, NetworkStatus } from "@apollo/client";
import LeaderboardUser from "./LeaderboardUser";
import { motion, Variants } from "framer-motion";

export const LEADERBOARD_QUERY = gql`
    query guildLeaderboard($guildId: BigInt!, $first: BigInt!, $after: String) {
        userGuildXpConnection(guildId: $guildId, first: $first, after: $after) {
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

export const leaderboardQueryVars = {
    guildId: "187450744427773963",
    first: "50",
};

const list: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
};

export default function PostList() {
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        LEADERBOARD_QUERY,
        {
            variables: leaderboardQueryVars,
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

    const { totalCount, edges } = data.userGuildXpConnection;
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
