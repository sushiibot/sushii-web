import { useGraphQLQuery } from "../lib/useGraphQLQuery";
import { useCurrentUserQuery, useLogoutMutation } from "@sushii-web/graphql";
import { useState } from "react";
import { useQueryClient } from "react-query";

export default function Login() {
    // if dropdown is open
    const [isOpen, setIsOpen] = useState(false);

    // graphql stuff
    const client = useGraphQLQuery();
    // reqct-query client
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useCurrentUserQuery(client);
    const logoutMutation = useLogoutMutation(client, {
        onSuccess: (data) => {
            // Invalidate all queries when logged out
            queryClient.invalidateQueries();
            console.log("Logged out", data);
        },
        onError: (e) => {
            console.error("Error logging out:", logoutMutation.error);
        },
    });

    const logOut = async () => {
        logoutMutation.mutate({});
    };

    if (error) {
        console.error("Failed to get current user", error);
    }

    if (status == "loading") {
        return null;
    }

    const textClasses = "normal-case font-normal tracking-normal text-base";

    if (!data?.currentUser) {
        return (
            <div className={`${textClasses} bg-gray-800 rounded-lg p-2`}>
                <a href="/auth/discord">Login with Discord</a>
            </div>
        );
    }

    const { currentUser } = data;

    let avatarUrlExtension = "jpg";
    if (currentUser.avatar.startsWith("a_")) {
        avatarUrlExtension = "gif";
    }
    let avatarUrl = `https://cdn.discordapp.com/embed/avatars/${
        currentUser.discriminator % 5
    }.png?size=64`;

    if (currentUser.avatar) {
        avatarUrl = `https://cdn.discordapp.com/avatars/${currentUser.id}/${currentUser.avatar}.${avatarUrlExtension}?size=64`;
    }

    return (
        <div className="relative">
            <button
                className={`${textClasses} bg-gray-900 rounded-lg p-2 \
                            focus:outline-none focus:bg-gray-800`}
                onClick={() => setIsOpen(!isOpen)}
                // onBlur={() => setIsOpen(false)}
            >
                <img
                    className="w-10 h-10 rounded-full inline-block"
                    src={avatarUrl}
                    alt={`${currentUser.username}'s avatar`}
                />
                <div className="pl-2 inline-block">{currentUser.username}</div>
            </button>
            <div
                className={
                    (isOpen ? "block" : "hidden") +
                    " absolute bg-gray-800 border border-gray-600 rounded p-2 \
                    w-full top-full right-0 mt-2"
                }
            >
                <button onClick={logOut}>Logout</button>
            </div>
        </div>
    );
}
