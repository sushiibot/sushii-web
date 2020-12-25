import Head from "next/head";
import { GetServerSideProps } from "next";

import LeaderboardList, {
    LEADERBOARD_QUERY,
    GuildLeaderboardProps,
} from "../../components/LeaderboardList";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";

export default function Leaderboard({ guildId }: GuildLeaderboardProps) {
    return (
        <div className="flex-grow">
            <Head>
                <title>Leaderboard | sushii 2</title>
            </Head>
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <h1 className="text-4xl mt-4">{guildId} Leaderboard</h1>
                <LeaderboardList guildId={guildId} />
            </section>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = initializeApollo();

    const leaderboardQueryVars = {
        guildId: context.params?.guildId,
        first: "50",
    };

    await apolloClient.query({
        query: LEADERBOARD_QUERY,
        variables: leaderboardQueryVars,
    });

    return addApolloState(apolloClient, {
        props: { guildId: context.params?.guildId },
    });
};
