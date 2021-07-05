import { GuildRuleSetsQuery } from "@sushii-web/graphql";
import Link from "next/link";

interface Props {
    guildId: string;
    data: GuildRuleSetsQuery;
}

export default function GuildRuleSetsList({ guildId, data }: Props) {
    return (
        <div>
            <h2>{data.guildRuleSets.totalCount} total rule sets</h2>
            {data.guildRuleSets.nodes.map((r) => (
                <div key={r.id}>
                    <h3>{r.name}</h3>
                    <Link
                        href={{
                            pathname: `./rules/ruleset/${r.id}`,
                            query: { guildId },
                        }}
                    >
                        <a className="bg-blue-500 rounded">Edit</a>
                    </Link>
                </div>
            ))}
        </div>
    );
}
