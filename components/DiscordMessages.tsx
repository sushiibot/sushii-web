import DiscordMessage from "./DiscordMessage";
import { Message as MessageProps } from "../typings";

interface Props {
    messages: MessageProps[];
}

export default function DiscordMessages({ messages }: Props) {
    return (
        <ul className="m-3 mt-0 bg-discord-dark rounded border border-gray-600">
            {messages.map((msg, i) => (
                <DiscordMessage key={i} {...msg} />
            ))}
        </ul>
    );
}
