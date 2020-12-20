import Head from "next/head";
import Nav from "../components/Nav";

export default function Home() {
    return (
        <div className="max-w-screen-lg w-100 mx-auto">
            <Nav />
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
                            className="p-2 px-4 rounded-lg shadow-md bg-gradient-to-br from-purple-400 via-blue-500 to-teal-500"
                            href="/invite"
                        >
                            Add Me
                        </a>
                        <a
                            className="p-2 px-4 rounded-lg border-2 box-border border-white ml-4"
                            href="/commands"
                        >
                            View Commands
                        </a>
                    </div>
                    <div className="w-100 w-50-l pa2"></div>
                </section>
                <section className="my-20 flex flex-wrap justify-around">
                    <div>
                        <svg
                            className="w-10 mb-2 stroke-2 stroke-current text-blue-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                        </svg>
                        <h2 className="text-2xl">Moderation Tools</h2>
                        <p className="sm:max-w-md mb-4">
                            sushii provides a handful of tools oriented around
                            moderation logs. View moderation actions, assign
                            reasons, view a user's moderation history, and more
                        </p>
                    </div>
                    <div>
                        <svg
                            className="w-10 mb-2 stroke-2 stroke-current text-teal-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 11l7-7 7 7M5 19l7-7 7 7"
                            />
                        </svg>
                        <h2 className="text-2xl">User XP and Levels</h2>
                        <p className="sm:max-w-md mb-4">
                            Gain XP when messaging and see how you rank in
                            server activity across different time periods --
                            day, week, month, and all time.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
