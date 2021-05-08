import Head from "next/head";
import { useQuery } from "react-query";
import ReactMarkdown from "react-markdown";

function ChangelogContent({ data }: { data: string }) {
    const lines = data.split("\n");
    lines.splice(0, 1);
    const withoutTitle = lines.join("\n");

    return <ReactMarkdown className="prose">{withoutTitle}</ReactMarkdown>;
}

export default function Changelog() {
    const { isLoading, isError, data, error } = useQuery("changelog", () =>
        fetch(
            "https://raw.githubusercontent.com/sushiibot/sushii-2/main/sushii-2/CHANGELOG.md"
        ).then((res) => res.text())
    );

    return (
        <div className="flex-grow">
            <Head>
                <title>Changelog | sushii 2</title>
            </Head>
            <section className="max-w-screen-2xl mx-auto px-3 pt-6">
                <h1 className="text-4xl my-4">Changelog</h1>
                {isError && <div>Failed to load changelog</div>}
                {isLoading && <div>Loading...</div>}
                {data && <ChangelogContent data={data} />}
            </section>
        </div>
    );
}
