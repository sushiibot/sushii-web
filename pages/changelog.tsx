import useSWR from "swr";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

const fetcher = (...args: [RequestInfo, RequestInit]) =>
    fetch(...args).then((res) => res.text());

function ChangelogContent({ data }: { data: string }) {
    const lines = data.split("\n");
    lines.splice(0, 1);
    const withoutTitle = lines.join("\n");

    return <ReactMarkdown className="prose">{withoutTitle}</ReactMarkdown>;
}

export default function Changelog() {
    const { data, error } = useSWR(
        "https://raw.githubusercontent.com/sushiibot/sushii-2/main/sushii-2/CHANGELOG.md",
        fetcher
    );

    return (
        <div className="flex-grow">
            <Head>
                <title>Changelog | sushii 2</title>
            </Head>
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <h1 className="text-4xl my-4">Changelog</h1>
                {error && <div>Failed to load changelog</div>}
                {data ? <ChangelogContent data={data} /> : <div>Loading</div>}
            </section>
        </div>
    );
}
