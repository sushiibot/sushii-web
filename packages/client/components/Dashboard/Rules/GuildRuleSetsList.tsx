import { GuildRuleSetsQuery } from "@sushii-web/graphql";

interface Props {
    data: GuildRuleSetsQuery;
}

export default function GuildRuleSetsList({ data }: Props) {
    return (
        <div>
            <h2>{data.guildRuleSets.totalCount} total rule sets</h2>
            {data.guildRuleSets.nodes.map((r) => (
                <div key={r.id}>
                    <h3>{r.name}</h3>
                </div>
            ))}
        </div>
    );
}
