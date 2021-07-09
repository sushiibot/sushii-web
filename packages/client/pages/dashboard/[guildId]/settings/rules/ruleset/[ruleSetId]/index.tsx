import Head from "next/head";
import Layout from "../../../../../../../components/Dashboard/Layout";
import { useRouter } from "next/router";
import {
    useGuildRuleSetQuery,
    useEditGuildRuleSetMutation,
    useEditGuildRuleMutation,
    GuildRuleSetInput,
    GuildRuleSetPatch,
    useCreateGuildRuleMutation,
    GuildRule,
    GuildRulesOrderBy,
} from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../../../../../lib/useGraphQLQuery";
import { useQueryClient } from "react-query";
import GuildRuleSetsList from "../../../../../../../components/Dashboard/Rules/GuildRuleSetsList";
import { Controller, useForm } from "react-hook-form";
import TextInputWithLabel from "../../../../../../../components/Form/TextInputWithLabel";
import ToggleInput from "../../../../../../../components/Form/ToggleInput";
import SaveBar from "../../../../../../../components/Form/SaveBar";
import { useEffect, useState } from "react";
import NewRuleForm from "../../../../../../../components/Dashboard/Rules/NewRuleForm";
import Rule from "../../../../../../../components/Dashboard/Rules/Rule";
import { isEqual } from "lodash";

function ruleArrayToObject(rules: GuildRule[]): { [id: string]: GuildRule } {
    const rulesMap: { [id: string]: GuildRule } = {};

    if (!rules) {
        return rulesMap;
    }

    rules.forEach((r) => {
        rulesMap[r.id] = r;
    });

    return rulesMap;
}

export default function RuleSetPage() {
    const router = useRouter();
    const ruleSetId =
        typeof router.query.ruleSetId === "string"
            ? router.query.ruleSetId
            : undefined;

    const client = useGraphQLQuery();
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useGuildRuleSetQuery(
        client,
        {
            id: ruleSetId,
        },
        // Prevent re-fetching and losing editing state
        { staleTime: Infinity }
    );

    const editRuleSetMutation = useEditGuildRuleSetMutation(client, {
        onSuccess: (data) => {
            // No query invalidation here since we want to do it after all the
            // other queries are finished
            console.log("edited rule set", data);
        },
        onError: (e) => {
            console.error("Error editing rule set:", editRuleSetMutation.error);
        },
    });

    const createRuleMutation = useCreateGuildRuleMutation(client, {
        onSuccess: (newData) => {
            queryClient.invalidateQueries(["GuildRuleSet", { id: ruleSetId }]);
            resetForms();
        },
        onError: (e) => {
            console.error("Error creating rule:", createRuleMutation.error);
        },
    });

    const editGuildRuleMutation = useEditGuildRuleMutation(client, {
        onSuccess: (data) => {
            console.log("Edited rule", data);
        },
        onError: (e) => {
            console.error("Error editing rule:", editGuildRuleMutation.error);
        },
    });

    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors, isDirty },
    } = useForm<GuildRuleSetInput>({
        defaultValues: {
            name: data?.guildRuleSet.name || "",
        },
        mode: "all",
    });

    const resetForms = () => {
        reset({
            name: data?.guildRuleSet.name || "",
            description: data?.guildRuleSet.description || "",
            enabled: data?.guildRuleSet.enabled || true,
        });

        // Reset rule states to server state data
        setRuleStates(
            ruleArrayToObject(data?.guildRuleSet?.guildRulesBySetId.nodes)
        );

        // Clear all dirty states
        setDirtyStates({});
    };

    // State for currently modified rules
    const [ruleStates, setRuleStates] = useState<{ [id: string]: GuildRule }>(
        () => ruleArrayToObject(data?.guildRuleSet?.guildRulesBySetId.nodes)
    );

    // Dirty states for each of the rules
    const [dirtyStates, setDirtyStates] = useState({});

    // When a rule is modified, update the state and dirty status
    const ruleOnChange = (ruleId: string, newRuleData: GuildRule) => {
        // TODO: Possible performance issue here if cloning everything whenever
        // anything is modified
        setRuleStates({ ...ruleStates, [ruleId]: newRuleData });

        const initialRuleData = data?.guildRuleSet?.guildRulesBySetId.nodes.find(
            (r) => r.id === ruleId
        );
        const isDirty = !isEqual(newRuleData, initialRuleData);
        setDirtyStates({ ...dirtyStates, [ruleId]: isDirty });
    };

    // If rule set form or any contained rule is modified
    const isAnyDirty =
        isDirty || Object.values(dirtyStates).some((isDirty) => isDirty);

    // defaultValues is cached at first render, so we need to reset it after
    // data is fetched
    useEffect(() => {
        // Reset ruleset form
        resetForms();
        setDirtyStates({});
    }, [data]);

    const onSubmit = async (data: GuildRuleSetPatch) => {
        console.log(data);

        // If rule set form is dirty
        if (isDirty) {
            await editRuleSetMutation.mutateAsync({
                id: ruleSetId,
                patch: data,
            });
        }

        // Loop over each rule to see if we need to update it
        // Running a network mutate query each time there is a dirty rule which
        // isn't really very efficient (sry graphql) but oh well it's more
        // complicated otherwise
        await Promise.all(
            Object.values(ruleStates).map(async (rule) => {
                // If rule is dirty, run mutate query
                if (dirtyStates[rule.id]) {
                    const {
                        name,
                        enabled,
                        trigger,
                        conditions,
                        actions,
                    } = rule;

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
                }
            })
        );

        // Invalidate query to refetch
        queryClient.invalidateQueries(["GuildRuleSet", { id: ruleSetId }]);
        resetForms();
    };

    return (
        <>
            <Head>
                <title>
                    {data?.guildRuleSet.name || ""} Rule Set | sushii 2
                </title>
            </Head>
            <section className="w-full">
                <h1 className="text-4xl font-medium">Rule Set</h1>
                <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <TextInputWithLabel title="Name" {...field} />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message:
                                        "Rule set name must be at least 1 character long",
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <TextInputWithLabel
                                    name="description"
                                    title="Description"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="enabled"
                            render={({ field }) => (
                                <ToggleInput title="Enabled" {...field} />
                            )}
                        />
                    </form>
                    <NewRuleForm setId={ruleSetId} />
                    <h2 className="text-2xl font-medium mt-4">Rules</h2>
                    {Object.values(ruleStates).map((r) => (
                        <Rule onChange={ruleOnChange} key={r.id} rule={r} />
                    ))}

                    <SaveBar
                        visible={isAnyDirty}
                        onReset={resetForms}
                        onSave={handleSubmit(onSubmit)}
                    />
                </div>
            </section>
        </>
    );
}

RuleSetPage.getLayout = (page) => <Layout>{page}</Layout>;
