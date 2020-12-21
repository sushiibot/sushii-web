import Head from "next/head";
import Link from "next/link";
import FeatureBlock, { IconType } from "../components/FeatureBlock";

export default function Home() {
    return (
        <div className="max-w-screen-lg w-100 mx-auto flex-grow">
            <Head>
                <title>sushii 2</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="pt-36 px-4">
                <section className="flex flex-wrap flex-grow items-center justify-items-center">
                    <div className="w-full lg:w-1/2 md:pl-20 p-2">
                        <h1 className="text-5xl font-medium">sushii 2</h1>
                        <h2 className="text-xl mt-2 mb-8">
                            Moderation bot for Discord.
                        </h2>
                        <a
                            className="inline-block p-2 px-4 mr-4 mb-2 rounded-lg transition-all relative top-0 hover:-top-0.5 bg-gradient-to-br from-purple-400 via-blue-500 to-teal-500"
                            href={process.env.NEXT_PUBLIC_INVITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Add me to Discord
                        </a>
                        <Link href="/commands">
                            <a className="inline-block p-2 px-4 rounded-lg transition-all relative top-0 hover:-top-0.5 bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-blue-300 to-teal-400">
                                View commands
                            </a>
                        </Link>
                    </div>
                </section>
                <section className="mt-24 flex flex-wrap">
                    <FeatureBlock title="Moderation Tools" icon={IconType.Chat}>
                        Log moderation actions, assign reasons, view a user's
                        moderation history, and more
                    </FeatureBlock>
                    <FeatureBlock
                        title="User XP and Levels"
                        icon={IconType.Rank}
                    >
                        Gain XP when messaging and see how you rank in server
                        activity across different time periods -- day, week,
                        month, and all time.
                    </FeatureBlock>
                    <FeatureBlock
                        title="Advanced Role Management"
                        icon={IconType.Roles}
                    >
                        Let users assign their own configured roles, with
                        configured multiple role groups, role limits, and
                        primary/secondary roles for role a primary colour
                    </FeatureBlock>
                </section>
            </div>
        </div>
    );
}
