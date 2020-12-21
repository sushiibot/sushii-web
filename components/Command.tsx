import DiscordMessages from "./DiscordMessages";
import { Command as CommandProps } from "../typings";

export default function Command(props: CommandProps) {
    const { name, usage, aliases, description, examples } = props;

    return (
        <li className="my-3 mb-4">
            <p>
                <span className="font-medium text-blue-300">{name}</span>
                <span className="text-red-200"> {usage}</span>
            </p>
            {aliases?.length && (
                <div className="mt-2 mb-2">
                    <p className="text-gray-400 inline-block">Aliases:</p>
                    {aliases.map((alias, i) => (
                        <span
                            key={i}
                            className="mt-0 ml-2 mb-2 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded inline-block"
                        >
                            {alias}
                        </span>
                    ))}
                </div>
            )}

            <div className="w-100 border-l-2 mt-2 ml-4 px-2 bg-gray-900 rounded">
                <div className="">
                    <p className="m-0 p-3 measure">{description}</p>
                </div>
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
