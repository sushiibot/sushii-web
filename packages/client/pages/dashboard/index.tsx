import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { useWebUserGuildsQuery } from "@sushii-web/graphql";
import Link from "next/link";
import { getGuildIconUrl } from "../../lib/discordCdn";

export default function Dashboard() {
    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useWebUserGuildsQuery(client);

    if (error) {
        return <div>Error loading your servers :(</div>;
    }

    if (status === "loading" || !data?.webUserGuilds) {
        return <div>loading...</div>;
    }

    const {
        webUserGuilds: { nodes },
    } = data;

    return (
        <div className="flex-grow">
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <h2 className="text-xl mb-4">Select a server</h2>
                <div className="flex flex-wrap justify-around">
                    {nodes.map((node) => (
                        <Link
                            key={node.guildId}
                            href={`/dashboard/${node.guildId}`}
                        >
                            <a
                                className="opacity-80 hover:opacity-100
                                           transform hover:-translate-y-1
                                           transition
                                           flex flex-col items-center text-center"
                            >
                                {node.guild.icon ? (
                                    <img
                                        className="rounded-full w-20 h-20 mb-2"
                                        src={getGuildIconUrl(
                                            node.guildId,
                                            node.guild.icon
                                        )}
                                        alt={`${node.guild.name} icon`}
                                    />
                                ) : (
                                    <div className="rounded-full w-20 h-20 bg-gray-800 mb-2"></div>
                                )}
                                <p className="w-40 mb-6">{node.guild.name}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
