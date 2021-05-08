import Head from "next/head";
import Leaderboard from "../components/Leaderboard/Leaderboard";

export default function GlobalLeaderboardPage() {
    return (
        <div className="flex-grow">
            <Head>
                <title>Global Leaderboard | sushii 2</title>
            </Head>
            <section className="max-w-screen-2xl mx-auto px-3 pt-6">
                <Leaderboard />
            </section>
        </div>
    );
}
