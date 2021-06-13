import Head from "next/head";
import Layout from "../../../../../components/Dashboard/Layout";
import FeedsForm from "../../../../../components/Dashboard/Feeds/FeedsForm";
import { useRouter } from "next/router";

export default function DashboardFeedsPage() {
    const router = useRouter();
    const guildId =
        typeof router.query.guildId === "string"
            ? router.query.guildId
            : undefined;

    const routerIsLoading = guildId === undefined;
    const guildIdIsNum = /^\d+$/.test(guildId);

    return (
        <>
            <Head>
                <title>Feeds Settings | sushii 2</title>
            </Head>
            <section className="w-full">
                <h1 className="text-4xl font-medium">Add a new feed</h1>
                <FeedsForm />
            </section>
        </>
    );
}

DashboardFeedsPage.getLayout = (page) => <Layout>{page}</Layout>;
