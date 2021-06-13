import Head from "next/head";
import Layout from "../../../../../components/Dashboard/Layout";
import FeedsForm from "../../../../../components/Dashboard/Feeds/FeedsForm";
import { useRouter } from "next/router";
import Link from "next/link";

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
                <h1 className="text-4xl font-medium">Feeds</h1>
                <div className="mt-4">
                    <Link href={router.asPath + "/add"}>
                        <a className="bg-blue-500 rounded px-2 py-1">
                            Add a new feed
                        </a>
                    </Link>
                </div>
            </section>
        </>
    );
}

DashboardFeedsPage.getLayout = (page) => <Layout>{page}</Layout>;
