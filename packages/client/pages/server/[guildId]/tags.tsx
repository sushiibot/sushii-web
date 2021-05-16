import { Tag, useGuildTagsQuery } from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../lib/useGraphQLQuery";
import Layout from "../../../components/Server/Layout";
import { useDashboardRouter } from "../../../lib/dashboardRouter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import RTable from "../../../components/Dashboard/RTable";

export default function TagsBody() {
    const { guildId } = useDashboardRouter();

    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useGuildTagsQuery(client, {
        guildId,
    });

    return (
        <Layout>
            <h1 className="text-4xl font-medium">Server Tags</h1>
            <h2 className="text-lg">
                {data ? data.tags.totalCount.toLocaleString() : "..."} total
                tags
            </h2>
            <div className="bg-gray-800 border border-gray-750 rounded-2xl p-4 mt-4">
                {status === "loading" ? (
                    <div>Loading...</div>
                ) : (
                    <RTable
                        columns={[
                            {
                                accessor: "tagName",
                                Header: "Tag Name",
                                filter: "fuzzyText",
                            },
                            {
                                accessor: (row: Tag) => (
                                    <div className="group relative">
                                        <div
                                            className="w-auto whitespace-nowrap hidden group-hover:inline
                                        bg-gray-600 rounded p-2
                                        absolute bottom-full"
                                        >
                                            ID: {row.ownerId}
                                        </div>
                                        <div className="text-sm flex items-center">
                                            <img
                                                className="rounded-full w-6 h-6"
                                                src={
                                                    row.owner?.avatarUrl ||
                                                    `https://cdn.discordapp.com/embed/avatars/${
                                                        row.ownerId % 5
                                                    }.png`
                                                }
                                            />
                                            <span className="ml-2 text-gray-400">
                                                {row.owner?.name ||
                                                    "ID " + row.ownerId}
                                            </span>
                                        </div>
                                    </div>
                                ),
                                Header: "Owner",
                                id: "owner",
                                filter: "fuzzyOwnerObj",
                            },
                            {
                                accessor: "useCount",
                                Header: "Use Count",
                            },
                            {
                                accessor: (row: Tag) => (
                                    <ReactMarkdown
                                        className="prose break-words"
                                        remarkPlugins={[gfm]}
                                        linkTarget="_blank"
                                    >
                                        {row.content}
                                    </ReactMarkdown>
                                ),
                                Header: "Content",
                                id: "content",
                                filter: "fuzzyContentObj",
                            },
                        ]}
                        data={data.tags.edges.map((t) => t.node)}
                    />
                )}
            </div>
        </Layout>
    );
}
