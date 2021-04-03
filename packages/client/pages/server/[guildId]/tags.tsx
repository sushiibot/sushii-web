import { useGuildTagsQuery } from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../lib/useGraphQLQuery";
import { useRouter } from "next/router";

export default function tagsPage() {
    const router = useRouter();
    const guildId = Array.isArray(router.query.guildId)
        ? router.query.guildId.join("")
        : router.query.guildId;

    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useGuildTagsQuery(client, {
        guildId,
    });

    if (!guildId || status === "loading") {
        return <div>Loading</div>;
    }

    if (!data.tags) {
        return <div>Error: Invalid server</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {data.tags.nodes.map((t) => (
                <div key={t.tagName}>{t.content}</div>
            ))}
        </div>
    );
}
