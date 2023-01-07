import { GuildRule, useEditGuildRuleMutation } from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../lib/useGraphQLQuery";
import schema from "./schema.json";
import { IChangeEvent } from "@rjsf/core";
import JsonSchemaForm from "../JsonSchemaForm/JsonSchemaForm";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { useQueryClient } from "react-query";

interface RuleProps {
    rule: GuildRule;
    setIsDirty: (key: string, isDirty: boolean) => void;
}

export default function Rule({ rule, setIsDirty }: RuleProps) {
    const client = useGraphQLQuery();
    const queryClient = useQueryClient();
    const editGuildRuleMutation = useEditGuildRuleMutation(client, {
        onSuccess: (data) => {
            // Invalidate rule set query to refetch (not just current rule)
            queryClient.invalidateQueries(["GuildRuleSet", { id: rule.setId }]);
            console.log("Edited rule", data);
        },
        onError: (e) => {
            console.error("Error editing rule:", editGuildRuleMutation.error);
        },
    });

    const [formData, setFormData] = useState<GuildRule>(rule);
    const isDirty = !isEqual(formData, rule);

    console.log("isDirty", isDirty);

    useEffect(() => {
        setIsDirty(rule.id, isDirty);
    }, [isDirty]);

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

    return (
        <div className="bg-gray-800 rounded-lg p-4 my-2">
            <h3 className="text-xl font-medium">{rule.name}</h3>
            {rule.enabled}
            <JsonSchemaForm
                schema={schema}
                onSubmit={onSubmit}
                onChange={(e) => setFormData(e.formData)}
                formData={formData}
            >
                <></>
            </JsonSchemaForm>
        </div>
    );
}
