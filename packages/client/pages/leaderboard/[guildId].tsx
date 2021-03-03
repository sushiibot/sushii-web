import Head from "next/head";
import { GetServerSideProps } from "next";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import { useRouter } from "next/router";

export default function GuildLeaderboardPage() {
    const router = useRouter();
    const guildId =
        typeof router.query.guildId === "string"
            ? router.query.guildId
            : undefined;

    return (
        <div className="flex-grow">
            <Head>
                <title>Leaderboard | sushii 2</title>
            </Head>
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <Leaderboard guildId={guildId} />
            </section>
        </div>
    );
}
