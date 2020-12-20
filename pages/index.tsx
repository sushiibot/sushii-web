import Head from "next/head";
import FeatureBlock, { IconType } from "../components/FeatureBlock";

export default function Home() {
    return (
        <div className="max-w-screen-lg w-100 mx-auto flex-grow">
            <Head>
                <title>sushii 2</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="pt-40 px-4">
                <section className="flex flex-wrap flex-grow items-center justify-items-center">
                    <div className="w-full md:w-1/2 md:pl-6 p-2">
                        <h1 className="text-5xl font-medium">sushii 2</h1>
                        <h2 className="text-xl mt-2 mb-8">
                            Moderation bot for Discord.
                        </h2>
                        <a
                            className="p-2 px-4 rounded-lg transition-all relative top-0 hover:-top-0.5 bg-gradient-to-br from-purple-400 via-blue-500 to-teal-500"
                            href="/invite"
                        >
                            Add Me
                        </a>
                        <a
                            className="p-2 px-4 rounded-lg transition-all relative top-0 hover:-top-0.5 border-2 box-border border-white ml-4"
                            href="/commands"
                        >
                            View Commands
                        </a>
                    </div>
                    <div className="w-100 w-50-l pa2"></div>
                </section>
                <section className="my-20 flex flex-wrap">
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
