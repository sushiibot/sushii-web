import {
    GuildRule,
    useDeleteGuildRuleMutation,
    useEditGuildRuleMutation,
} from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../lib/useGraphQLQuery";
import schema from "./schema.json";
import { IChangeEvent } from "@rjsf/core";
import JsonSchemaForm from "../JsonSchemaForm/JsonSchemaForm";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { useQueryClient } from "react-query";

interface RuleProps {
    rule: GuildRule;
    onChange: (id: string, data: GuildRule) => void;
}

export default function Rule({ rule, onChange }: RuleProps) {
    const client = useGraphQLQuery();
    const queryClient = useQueryClient();

    const deleteGuildRuleMutation = useDeleteGuildRuleMutation(client, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["GuildRuleSet", { id: rule.setId }]);
            console.log("Deleted rule", data);
        },
        onError: (e) => {
            console.error(
                "Error deleting rule:",
                deleteGuildRuleMutation.error
            );
        },
    });

    const deleteRule = async () => {
        await deleteGuildRuleMutation.mutateAsync({ id: rule.id });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 my-2">
            <div className="flex justify-between">
                <h3 className="text-xl font-medium">{rule.name}</h3>
                <button
                    className="px-2 py-1 rounded bg-red-500"
                    onClick={() => deleteRule()}
                >
                    Delete
                </button>
            </div>
            <JsonSchemaForm
                schema={schema}
                onChange={(e) => onChange(rule.id, e.formData)}
                formData={rule}
            >
                <></>
            </JsonSchemaForm>
        </div>
    );
}
