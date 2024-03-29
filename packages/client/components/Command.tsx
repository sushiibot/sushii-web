import DiscordMessages from "./DiscordMessages";
import { Command as CommandProps } from "../typings";
import ReactMarkdown from "react-markdown";

export default function Command(props: CommandProps) {
    const {
        name,
        required_permissions,
        usage,
        aliases,
        description,
        examples,
    } = props;

    return (
        <li className="my-3 mb-4 group">
            <p>
                <span className="font-medium text-blue-300 group-hover:text-blue-400">
                    {name}
                </span>
                <span className="text-red-300"> {usage}</span>
                {required_permissions?.length !== undefined && (
                    <>
                        {required_permissions.map((p, i) => (
                            <div
                                key={i}
                                className="ml-2 px-1 py-0.5 text-xs bg-red-600 rounded inline-block"
                            >
                                {p}
                            </div>
                        ))}
                    </>
                )}
            </p>
            {aliases?.length && (
                <div className="mt-2 mb-2">
                    <p className="text-gray-400 inline-block">Aliases:</p>
                    {aliases.map((alias, i) => (
                        <span
                            key={i}
                            className="mt-0 ml-2 mb-2 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded inline-block"
                        >
                            {alias}
                        </span>
                    ))}
                </div>
            )}

            <div className="w-100 mt-2 ml-4 px-2 bg-gray-800 rounded border-l-2 group-hover:border-blue-400 transition duration-75">
                <ReactMarkdown className="m-0 p-3 prose">
                    {description}
                </ReactMarkdown>
                {examples && (
                    <div className="pb-2">
                        <p className="text-gray-200 m-0 p-3">Examples</p>
                        <DiscordMessages messages={examples} />
                    </div>
                )}
            </div>
        </li>
    );
}
