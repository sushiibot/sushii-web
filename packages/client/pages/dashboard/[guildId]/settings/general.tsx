import { useRouter } from "next/router";
import { useGraphQLQuery } from "../../../../lib/useGraphQLQuery";
import { getGuildIconUrl } from "../../../../lib/discordCdn";
import {
    useGuildConfigQuery,
    useEditGuildConfigMutation,
    GuildConfigPatch,
} from "@sushii-web/graphql";
import { useQueryClient } from "react-query";
import Link from "next/link";
import Layout from "../../../../components/Dashboard/Layout";
import Head from "next/head";
import { useForm } from "react-hook-form";
import TextInput from "../../../../components/Dashboard/Inputs/TextInput";
import ToggleInput from "../../../../components/Dashboard/Inputs/ToggleInput";
import Icon from "../../../../components/Icon";

export default function SettingsGeneralPage() {
    const router = useRouter();
    const guildId = Array.isArray(router.query.guildId)
        ? router.query.guildId.join("")
        : router.query.guildId;

    const client = useGraphQLQuery();
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useGuildConfigQuery(client, {
        guildId,
    });

    const editConfigMutation = useEditGuildConfigMutation(client, {
        onSuccess: (data) => {
            // Invalidate guild config query to refetch
            queryClient.invalidateQueries("guildConfig");
            console.log("Edited guild config", data);
        },
        onError: (e) => {
            console.error("Error logging out:", editConfigMutation.error);
        },
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<GuildConfigPatch>({ mode: "all" });

    const onSubmit = (data) => console.log(data);

    if (!guildId || status === "loading") {
        return <div>Loading</div>;
    }

    if (!data.guildConfig) {
        return (
            <div>
                Error: Invalid server or you do not have permission to view this
                server.
            </div>
        );
    }

    const {
        guildConfig,
        guildConfig: { cachedGuildById: cachedGuild },
    } = data;

    return (
        <div>
            <Head>
                <title>{cachedGuild.name} Settings | sushii</title>
            </Head>
            <div className="flex items-center my-4 bg-gray-800 rounded p-2">
                <img
                    className="w-10 h-10 mr-4 rounded-full"
                    src={getGuildIconUrl(guildId, cachedGuild.icon)}
                    alt="Guild Icon URL"
                />
                <h2 className="text-xl truncate">{cachedGuild.name}</h2>
                <div className="ml-auto mr-2">
                    <Icon type="ChevronDown" />
                </div>
            </div>
            <h1 className="text-4xl font-medium mb-6">Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name="prefix"
                    title="Prefix"
                    control={control}
                    defaultValue={guildConfig.prefix || "-"}
                    rules={{
                        required: {
                            value: true,
                            message: "Prefix must be at least 1 character long",
                        },
                    }}
                />

                <ToggleInput
                    name="joinMsg"
                    title="Join Message"
                    control={control}
                    defaultValue={guildConfig.joinMsgEnabled}
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
                    Save All
                </button>
            </form>
            {guildConfig.disabledChannels &&
                guildConfig.disabledChannels.map((chanId) => (
                    <div key={chanId}>{chanId}</div>
                ))}
        </div>
    );
}

SettingsGeneralPage.getLayout = (page) => <Layout>{page}</Layout>;
