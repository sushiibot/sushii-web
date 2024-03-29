import Head from "next/head";

export default function About() {
    return (
        <div className="flex-grow">
            <Head>
                <title>About | sushii</title>
            </Head>
            <section className="max-w-screen-2xl mx-auto px-3 pt-6">
                <h1 className="text-4xl mt-4">About</h1>
                <p className="max-w-lg mt-4">
                    sushii with a bot with a focus on moderation tools. It has
                    replaced the older bot, rebuilt from the ground up. Still a
                    work in progress to improve UX and features!
                </p>
                <h2 className="text-2xl mt-4">Technologies</h2>
                <p className="max-w-lg mt-4">
                    sushii 2 is written in{" "}
                    <a
                        href="https://www.rust-lang.org/"
                        target="_blank"
                        className="text-blue-400"
                    >
                        Rust
                    </a>{" "}
                    and uses the async{" "}
                    <a
                        href="https://github.com/serenity-rs/serenity"
                        target="_blank"
                        className="text-blue-400"
                    >
                        serenity-rs
                    </a>{" "}
                    library. You can find the source code for sushii 2 on{" "}
                    <a
                        href="https://github.com/sushiibot/sushii-2"
                        target="_blank"
                        className="text-blue-400"
                    >
                        GitHub
                    </a>
                    . This website uses Next.js with React and PostGraphile.
                </p>
            </section>
        </div>
    );
}
