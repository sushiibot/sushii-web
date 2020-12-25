import Head from "next/head";

import LeaderboardList from "../components/LeaderboardList";
import { initializeApollo } from "../lib/apolloClient";

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
                <title>Leaderboard | sushii 2</title>
            </Head>
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <h1 className="text-4xl mt-4">Leaderboard</h1>
                <LeaderboardList />
            </section>
        </div>
    );
}
