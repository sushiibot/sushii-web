import Head from "next/head";
import Layout from "../../../../../components/Dashboard/Layout";
import { useRouter } from "next/router";
import {
    useGuildRuleSetsQuery,
    useCreateGuildRuleSetMutation,
    GuildRuleSetInput,
} from "@sushii-web/graphql";
import { useGraphQLQuery } from "../../../../../lib/useGraphQLQuery";
import { useQueryClient } from "react-query";
import GuildRuleSetsList from "../../../../../components/Dashboard/Rules/GuildRuleSetsList";
import { useForm } from "react-hook-form";
import TextInput from "../../../../../components/Dashboard/Inputs/TextInput";

export default function DashboardFeedsPage() {
    const router = useRouter();
    const guildId =
        typeof router.query.guildId === "string"
            ? router.query.guildId
            : undefined;

    const client = useGraphQLQuery();
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useGuildRuleSetsQuery(client, {
        guildId,
    });

    const createGuildRuleSetMutation = useCreateGuildRuleSetMutation(client, {
        onSuccess: (data) => {
            // Invalidate guild config query to refetch
            // queryClient.invalidateQueries("GuildRuleSets");
            console.log("Created rule set", data);
        },
        onError: (e) => {
            console.error(
                "Error creating rule set:",
                createGuildRuleSetMutation.error
            );
        },
    });

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm<GuildRuleSetInput>({ mode: "all" });

    const onSubmit = async (data) => {
        console.log(data);

        await createGuildRuleSetMutation.mutateAsync({
            guildRuleSet: {
                guildId,
                name: data.name,
                enabled: true,
            },
        });
    };
    const log = (type) => console.log.bind(console, type);

    return (
        <>
            <Head>
                <title>Rule Settings | sushii 2</title>
            </Head>
            <section className="w-full">
                <h1 className="text-4xl font-medium">Server Rule Sets</h1>
                <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            name="name"
                            title="New rule set name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message:
                                        "Rule set name must be at least 1 character long",
                                },
                            })}
                        />

                        <button
                            type="submit"
                            className={
                                "rounded mt-4 px-3 py-1 block " +
                                (Object.keys(errors).length > 0
                                    ? "bg-gray-700"
                                    : "bg-blue-500")
                            }
                        >
                            Add new rule set
                        </button>
                    </form>
                    {data ? (
                        <GuildRuleSetsList data={data} />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </section>
        </>
    );
}

DashboardFeedsPage.getLayout = (page) => <Layout>{page}</Layout>;
