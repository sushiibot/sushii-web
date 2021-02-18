import { Message as MessageProps } from "../typings";
import ReactMarkdown from "react-markdown";

export default function DiscordMessage({
    command,
    content,
    bot,
}: MessageProps) {
    const avatarUrl = bot
        ? "/images/sushii_avatar.png"
        : "/images/meowmeow.jpg";

    let msg_content = "";

    if (command) {
        msg_content = `-${command}`;
    }

    if (content) {
        msg_content = content;
    }

    return (
        <li className="flex p-2 hover:bg-discord-darken">
            <img
                src={avatarUrl}
                className="rounded-full h-10 w-10 mt-1 cursor-pointer
                    hover:opacity-90 hover:shadow-sm transform active:translate-y-px"
                title="meowmeow"
            />
            <div className="ml-3 flex-grow">
                <p className="">
                    <span className="text-md">
                        {bot ? (
                            <>
                                <span className="text-red-200 hover:underline cursor-pointer">
                                    sushii
                                </span>
                                <span className="ml-1 inline-block align-middle text-xxs px-1 rounded bg-discord-bot-badge">
                                    BOT
                                </span>
                            </>
                        ) : (
                            <span className="text-teal-200 hover:underline cursor-pointer">
                                User
                            </span>
                        )}
                    </span>
                    <span className="text-gray-500 text-xs ml-1">
                        Today at 12:30 PM
                    </span>
                </p>
                <ReactMarkdown className="prose-discord">
                    {msg_content}
                </ReactMarkdown>
            </div>
        </li>
    );
}
