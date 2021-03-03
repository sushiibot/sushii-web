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

    const routerIsLoading = guildId === undefined;
    const guildIdIsNum = /^\d+$/.test(guildId);

    return (
        <div className="flex-grow">
            <Head>
                <title>Leaderboard | sushii 2</title>
            </Head>
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                {guildId !== undefined && !guildIdIsNum ? (
                    <div>Invalid server :(</div>
                ) : (
                    <Leaderboard
                        guildId={guildId}
                        routerIsLoading={routerIsLoading}
                    />
                )}
            </section>
        </div>
    );
}
