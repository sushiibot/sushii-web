import Head from "next/head";
import Link from "next/link";
import FeatureBlock, { IconType } from "../components/Landing/FeatureBlock";
import DotSeparator from "../components/Landing/DotSeparator";
import Waves from "../components/Landing/Waves";
import BotStats from "../components/Landing/BotStats";

export default function Home() {
    return (
        <div>
            <Head>
                <title>sushii</title>
            </Head>
            <section className="landing-bg w-screen max-w-full h-screen-90">
                <div
                    className="h-5/6 m-auto max-w-screen-2xl pb-12 \
                                flex flex-wrap flex-grow items-center justify-items-center"
                >
                    <div className="w-full lg:w-1/2 md:pl-20 p-2">
                        <h1 className="text-6xl font-semibold">sushii</h1>
                        <h2 className="text-xl mt-2 mb-8">
                            Multi-purpose bot for Discord.
                        </h2>
                        <a
                            className="inline-block font-medium p-2 px-4 mr-4 mb-2 rounded-lg \
                                       transition-all relative top-0 hover:-top-0.5 \
                                       bg-gradient-to-br from-purple-400 via-blue-500 to-teal-500"
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
                        <DotSeparator count={3} />
                        <BotStats />
                    </div>
                    <div className="w-full lg:w-1/2 px-6">
                        <img
                            className="max-h-80 ml-16 mr-16 transform transition-transform \
                                     hover:-translate-y-6 hover:rotate-3 origin-bottom-left"
                            src="/images/sushii_chopstick.svg"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mb-2 text-blue-400 mx-auto
                                transform transition-transform group-hover:translate-y-1.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                            />
                        </svg>
                        <p
                            className="tracking-widest text-gray-500
                                       transform transition-all
                                     group-hover:text-gray-400
                                       group-hover:translate-y-2"
                        >
                            scroll down
                        </p>
                    </div>
                </div>
                <Waves />
            </section>
            <section className="mt-24 flex flex-wrap max-w-screen-lg w-100 mx-auto flex-grow bg-gray-1000">
                <FeatureBlock title="Moderation Tools" icon={IconType.Chat}>
                    Timed mutes, bulk bans, flexible moderation action logging,
                    assignable moderation reasons, view a user's moderation
                    history, and more
                </FeatureBlock>
                <FeatureBlock title="User XP and Levels" icon={IconType.Rank}>
                    Gain XP when messaging and see how you rank in server
                    activity across different time periods — day, week, month,
                    and all time.
                </FeatureBlock>
                <FeatureBlock
                    title="Advanced Role Management"
                    icon={IconType.Roles}
                >
                    Let users assign their own roles, with configurable role
                    groups, group role limits, and primary/secondary roles for
                    role a primary colour
                </FeatureBlock>
            </section>
        </div>
    );
}
