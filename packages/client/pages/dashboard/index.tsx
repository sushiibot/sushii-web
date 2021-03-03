import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { useManagedGuildsQuery } from "@sushii-web/graphql";

function getGuildIconUrl(
    id: string,
    icon: string | undefined
): string | undefined {
    if (!icon) {
        return undefined;
    }

    if (icon.startsWith("a_")) {
        return `https://cdn.discordapp.com/icons/${id}/${icon}.gif`;
    }

    return `https://cdn.discordapp.com/icons/${id}/${icon}.jpg`;
}

export default function Dashboard() {
    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useManagedGuildsQuery(client);

    if (error) {
        return <div>Error loading your servers :(</div>;
    }

    if (status === "loading" || !data?.webGuilds) {
        return <div>loading...</div>;
    }

    const {
        webGuilds: { edges },
    } = data;

    return (
        <div className="flex-grow">
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <h2 className="text-xl mb-4">Select a server</h2>
                <div className="flex justify-around">
                    {edges.map(({ node }) => (
                        <div key={node.id}>
                            {node.icon && (
                                <img
                                    className="rounded-full w-20 h-20"
                                    src={getGuildIconUrl(node.id, node.icon)}
                                    alt={`${node.name} icon`}
                                />
                            )}
                            <p className="w-40">{node.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
