import Head from "next/head";
import Layout from "../../../components/Server/Layout";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
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
        <Layout>
            <Head>
                <title>Leaderboard | sushii 2</title>
            </Head>
            <section className="w-full">
                {guildId !== undefined && !guildIdIsNum ? (
                    <div>Invalid server :(</div>
                ) : (
                    <Leaderboard
                        guildId={guildId}
                        routerIsLoading={routerIsLoading}
                    />
                )}
            </section>
        </Layout>
    );
}
