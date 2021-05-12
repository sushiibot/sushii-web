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
                <p className="text-lg font-medium">Hi tzuwy!</p>
                <h2 className="text-4xl font-medium mb-4">Pick a server</h2>
                <div className="flex flex-wrap">
                    {nodes.map((node) => (
                        <Link
                            key={node.guildId}
                            href={`/dashboard/${node.guildId}`}
                        >
                            <a
                                className="opacity-90 hover:opacity-100
                                           transform hover:-translate-y-1
                                           transition bg-white pt-6 m-4 rounded-lg
                                           flex flex-col items-center text-center
                                           text-gray-800"
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
                                <p className="w-36 mb-6 truncate">
                                    {node.guild.name}
                                </p>
                            </a>
                        </Link>
                    ))}
                    <div className="flex-grow"></div>
                </div>
            </section>
        </div>
    );
}
