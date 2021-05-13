import { useGuildTagsQuery } from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../lib/useGraphQLQuery";
import Layout from "../../../components/Dashboard/Layout";
import { useDashboardRouter } from "../../../lib/dashboardRouter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function TagsBody() {
    const { guildId } = useDashboardRouter();

    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useGuildTagsQuery(client, {
        guildId,
    });

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <h1 className="text-2xl">Server Tags</h1>
            <h2 className="text-lg">
                {data.tags.totalCount.toLocaleString()} total tags
            </h2>
            <table className="table-fixed">
                <thead className="border-b border-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider w-1/4">
                            Tag name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider w-1/4">
                            Owner
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                            Use Count
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                            Content
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.tags.edges.map(({ node }) => (
                        <tr key={node.tagName} className="even:bg-gray-800">
                            <td className="px-6 py-4">{node.tagName}</td>
                            <td className="px-6 py-4">
                                {node.owner?.name || `ID ${node.ownerId}`}
                            </td>
                            <td className="px-6 py-4">{node.useCount}</td>
                            <td className="px-6 py-4 prose">
                                <ReactMarkdown remarkPlugins={[gfm]}>
                                    {node.content}
                                </ReactMarkdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}
