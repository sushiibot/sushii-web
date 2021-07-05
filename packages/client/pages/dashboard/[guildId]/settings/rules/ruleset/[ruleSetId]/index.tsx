import Head from "next/head";
import Layout from "../../../../../../../components/Dashboard/Layout";
import { useRouter } from "next/router";
import {
    useGuildRuleSetQuery,
    useEditGuildRuleSetMutation,
    useEditGuildRuleMutation,
    GuildRuleSetInput,
    GuildRuleSetPatch,
} from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../../../../../lib/useGraphQLQuery";
import { useQueryClient } from "react-query";
import GuildRuleSetsList from "../../../../../../../components/Dashboard/Rules/GuildRuleSetsList";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../../../../../../../components/Form/TextInput";
import ToggleInput from "../../../../../../../components/Form/ToggleInput";
import SaveBar from "../../../../../../../components/Form/SaveBar";
import { useEffect } from "react";

export default function RuleSetPage() {
    const router = useRouter();
    const ruleSetId =
        typeof router.query.ruleSetId === "string"
            ? router.query.ruleSetId
            : undefined;

    const client = useGraphQLQuery();
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useGuildRuleSetQuery(client, {
        id: ruleSetId,
    });

    const editRuleSetMutation = useEditGuildRuleSetMutation(client, {
        onSuccess: (data) => {
            // Invalidate guild config query to refetch
            queryClient.invalidateQueries("GuildRuleSet");
            console.log("edited rule set", data);
        },
        onError: (e) => {
            console.error("Error editing rule set:", editRuleSetMutation.error);
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
    const log = (type) => console.log.bind(console, type);

    return (
        <>
            <Head>
                <title>Rule Settings | sushii 2</title>
            </Head>
            <section className="w-full">
                <h1 className="text-4xl font-medium">Rule Set</h1>
                <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <TextInput title="Name" {...field} />
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
                                <TextInput
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
                    {isDirty && (
                        <SaveBar
                            onReset={onReset}
                            onSave={handleSubmit(onSubmit)}
                        />
                    )}
                </div>
            </section>
        </>
    );
}

RuleSetPage.getLayout = (page) => <Layout>{page}</Layout>;
