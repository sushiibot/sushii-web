import DiscordMessages from "./DiscordMessages";
import { Command as CommandProps } from "../typings";

export default function Command(props: CommandProps) {
    const { name, usage, aliases, description, examples } = props;

    return (
        <li className="mv3">
            <p>
                <span className="font-medium text-blue">{name}</span>
                <span className="text-teal-400"> {usage}</span>
            </p>
            {aliases?.length && (
                <div className="mb-3">
                    <p className="text-gray-400">Aliases:</p>
                    {aliases.map((alias, i) => (
                        <span
                            key={i}
                            className="mt-0 mr-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded"
                        >
                            {alias}
                        </span>
                    ))}
                </div>
            )}

            <div className="w-100 bl bw1 pl2 bg-shadow br2 b--white-80 flex flex-wrap">
                <div className="w-100 w-50-l">
                    <p className="white-90 ma0 pa3 measure lh-copy">
                        {description}
                    </p>
                </div>
                <div className="w-100 w-50-l">
                    {examples && (
                        <>
                            <p className="white-90 ma0 pa3 measure fw6">
                                Examples
                            </p>
                            <DiscordMessages messages={examples} />
                        </>
                    )}
                </div>
            </div>
        </li>
    );
}
