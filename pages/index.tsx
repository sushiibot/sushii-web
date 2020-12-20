import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="min-vh-100 w-100">
            <Nav />
            <div className="min-vh-100 flex flex-column">
                <Head>
                    <title>sushii 2</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <section className="ph3 ph5-ns pt4 pv5 flex flex-wrap flex-grow items-center">
                    <div className="w-100 w-50-l pa2 pl6-l">
                        <h1 className="f1 fw6 ma0">sushii 2</h1>
                        <h2 className="fw4 f4 mt1">
                            Moderation bot for Discord.
                        </h2>
                        <a
                            className="f6 link dim br3 ph3 pv2 mb2 mr2 dib black-80 bg-blue"
                            href="/invite"
                        >
                            Add Me
                        </a>
                        <a
                            className="f6 link dim br3 ph3 pv2 mb2 mr2 dib ba b--white white"
                            href="/commands"
                        >
                            View Commands
                        </a>
                    </div>
                    <div className="w-100 w-50-l pa2"></div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
