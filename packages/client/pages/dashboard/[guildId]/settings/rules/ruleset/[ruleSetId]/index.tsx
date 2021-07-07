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
            // Set data returned from mutation (instead of invalidating which
            // does an extra network request)
            queryClient.setQueryData(
                ["GuildRuleSet", { id: ruleSetId }],
                data.updateGuildRuleSet
            );
            console.log("edited rule set", data);
            onReset();
        },
        onError: (e) => {
            console.error("Error editing rule set:", editRuleSetMutation.error);
        },
    });

    const createRuleMutation = useCreateGuildRuleMutation(client, {
        onSuccess: (newData) => {
            queryClient.invalidateQueries(["GuildRuleSet", { id: ruleSetId }]);
            onReset();
        },
        onError: (e) => {
            console.error("Error creating rule:", createRuleMutation.error);
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

    console.log("errors", errors);
    console.log(isDirty);

    const onReset = () => {
        reset({
            name: data?.guildRuleSet.name || "",
            description: data?.guildRuleSet.description || "",
            enabled: data?.guildRuleSet.enabled || true,
        });
    };

    // defaultValues is cached at first render, so we need to reset it after
    // data is fetched
    useEffect(() => {
        onReset();
    }, [data]);

    const onSubmit = async (data: GuildRuleSetPatch) => {
        console.log(data);

        await editRuleSetMutation.mutateAsync({
            id: ruleSetId,
            patch: data,
        });
    };

    const [dirtyStates, setDirtyStates] = useState({});
    const setIsDirty = (ruleId: string, isDirty: boolean) => {
        setDirtyStates({ ...dirtyStates, [ruleId]: isDirty });
    };

    console.log(dirtyStates);

    const isAnyDirty =
        isDirty || Object.values(dirtyStates).some((isDirty) => isDirty);

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
                    {data?.guildRuleSet?.guildRulesBySetId?.nodes.map((r) => (
                        <Rule setIsDirty={setIsDirty} key={r.id} rule={r} />
                    ))}

                    <SaveBar
                        visible={isAnyDirty}
                        onReset={onReset}
                        onSave={handleSubmit(onSubmit)}
                    />
                </div>
            </section>
        </>
    );
}

RuleSetPage.getLayout = (page) => <Layout>{page}</Layout>;
