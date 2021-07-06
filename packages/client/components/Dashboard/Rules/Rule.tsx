import { GuildRule, useEditGuildRuleMutation } from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../lib/useGraphQLQuery";
import schema from "./schema.json";
import { IChangeEvent } from "@rjsf/core";

import JsonSchemaForm from "../JsonSchemaForm/JsonSchemaForm";

interface RuleProps {
    rule: GuildRule;
}

export default function Rule({ rule }: RuleProps) {
    const client = useGraphQLQuery();
    const editGuildRuleMutation = useEditGuildRuleMutation(client, {
        onSuccess: (data) => {
            // Invalidate guild config query to refetch
            // queryClient.invalidateQueries("GuildRuleSets");
            console.log("Created rule set", data);
        },
        onError: (e) => {
            console.error(
                "Error creating rule set:",
                editGuildRuleMutation.error
            );
        },
    });

    const onSubmit = async (data: IChangeEvent<GuildRule>) => {
        console.log(data);

        const { name, enabled, trigger, conditions, actions } = data.formData;

        await editGuildRuleMutation.mutateAsync({
            id: rule.id,
            patch: {
                name,
                enabled,
                trigger,
                conditions,
                actions,
            },
        });
    };

    console.log(rule);

    return (
        <div className="bg-gray-800 rounded-lg p-4 my-2">
            <h3 className="text-xl font-medium">{rule.name}</h3>
            {rule.enabled}
            <JsonSchemaForm
                schema={schema}
                onSubmit={onSubmit}
                formData={rule}
            />
        </div>
    );
}
