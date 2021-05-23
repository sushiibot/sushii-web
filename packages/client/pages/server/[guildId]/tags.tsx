import { Tag, useGuildTagsQuery } from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../lib/useGraphQLQuery";
import Layout from "../../../components/Server/Layout";
import { useDashboardRouter } from "../../../lib/dashboardRouter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import RTable from "../../../components/Dashboard/RTable";
import type { Row } from "react-table";

export default function TagsPage() {
    const { guildId } = useDashboardRouter();

    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useGuildTagsQuery(
        client,
        {
            guildId,
        },
        {
            // 30 minutes
            staleTime: 30 * 60 * 1000,
        }
    );

    return (
        <>
            <h1 className="text-4xl font-medium">Server Tags</h1>
            <h2 className="text-lg">
                {data ? data.tags.totalCount.toLocaleString() : "..."} total
                tags
            </h2>
            <div className="bg-gray-800 border border-gray-750 rounded-2xl p-4 mt-4 flex-grow">
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
                                                loading="lazy"
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
                                sortType: (a: Row<Tag>, b: Row<Tag>) => {
                                    if (
                                        a.original.owner?.name &&
                                        b.original.owner?.name
                                    ) {
                                        return a.original.owner.name.localeCompare(
                                            b.original.owner.name
                                        );
                                    }

                                    if (!a.original.owner) {
                                        return -1;
                                    }

                                    if (!b.original.owner) {
                                        return -1;
                                    }

                                    return (
                                        a.original.ownerId - b.original.ownerId
                                    );
                                },
                            },
                            {
                                accessor: "useCount",
                                Header: "Use Count",
                            },
                            {
                                accessor: (row: Tag) => (
                                    <div className="whitespace-normal">
                                        <ReactMarkdown
                                            className="prose break-words"
                                            remarkPlugins={[gfm]}
                                            linkTarget="_blank"
                                        >
                                            {row.content}
                                        </ReactMarkdown>
                                    </div>
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
        </>
    );
}

TagsPage.getLayout = (page) => <Layout>{page}</Layout>;
