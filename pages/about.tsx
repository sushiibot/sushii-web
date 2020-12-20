export default function About() {
    return (
        <div className="flex-grow">
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <h1 className="text-4xl mt-4">About</h1>
                <p className="max-w-lg mt-4">
                    sushii 2 is the rewritten version of sushii with a focus on
                    moderation tools. It is still a work in progress as it is
                    rebuilt from the ground up. While it is currently a
                    secondary bot running alongside the original sushii, it will
                    eventually replace the original sushii bot.
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
                    . This website uses Next.js with React and a Rust API
                    backend.
                </p>
            </section>
        </div>
    );
}
