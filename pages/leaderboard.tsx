import Head from "next/head";
import { GetServerSideProps } from "next";
import LeaderboardList, {
    LEADERBOARD_QUERY,
    LeaderboardQueryVars,
    GuildLeaderboardProps,
} from "../components/LeaderboardList";
import { initializeApollo, addApolloState } from "../lib/apolloClient";

/*
export async function getStaticProps() {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: LEADERBOARD_QUERY,
        variables: leaderboardQueryVars,
    });

    return apolloClient;
}
*/

export default function Leaderboard() {
    return (
        <div className="flex-grow">
            <Head>
                <title>Global Leaderboard | sushii 2</title>
            </Head>
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <LeaderboardList />
            </section>
        </div>
    );
}

/*
export const getServerSideProps: GetServerSideProps = async () => {
    const apolloClient = initializeApollo();

    const leaderboardQueryVars: LeaderboardQueryVars = {
        timeframe: "ALL_TIME",
        first: "50",
    };

    await apolloClient.query({
        query: LEADERBOARD_QUERY,
        variables: leaderboardQueryVars,
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};
*/
