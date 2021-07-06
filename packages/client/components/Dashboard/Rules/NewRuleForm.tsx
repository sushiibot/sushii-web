import {
    GuildRuleInput,
    useCreateGuildRuleMutation,
} from "@sushii-web/graphql";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useGraphQLQuery } from "../../../lib/useGraphQLQuery";
import TextInputWithLabel from "../../Form/TextInputWithLabel";

interface NewRuleFormProps {
    setId: string;
}

export default function NewRuleForm({ setId }: NewRuleFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        register,
        formState: { errors },
    } = useForm<GuildRuleInput>({
        defaultValues: { name: "" },
        mode: "all",
    });

    const client = useGraphQLQuery();
    const queryClient = useQueryClient();
    const createGuildRuleMutation = useCreateGuildRuleMutation(client, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["GuildRuleSet", { id: setId }]);
            reset({ name: "" });
        },
        onError: (e) => {
            console.error("Failed to create new rule", e);
        },
    });

    const onSubmit = async (data) => {
        console.log(data);

        await createGuildRuleMutation.mutateAsync({
            guildRule: {
                name: data.name,
                setId,
                enabled: true,
                trigger: {},
                conditions: {},
                actions: {},
            },
        });
    };
    return (
        <div>
            <h2 className="text-2xl font-medium mt-4">Add a new rule</h2>
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
                                "Rule name must be at least 1 character long",
                        },
                    }}
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
                    Add
                </button>
            </form>
        </div>
    );
}
