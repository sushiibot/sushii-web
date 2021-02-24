import commandsList from "../commands.json";
import Command from "../components/Command";
import { CommandsList } from "../typings";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

// Make TS happy with JSON file types
const commands: CommandsList = commandsList;

export default function Commands() {
    return (
        <div className="flex-grow">
            <Head>
                <title>Commands | sushii 2</title>
            </Head>
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <h1 className="text-4xl my-4">Commands</h1>
                <p className="leading-relaxed max-w-screen-sm">
                    The default prefix for sushii is{" "}
                    <span className="px-1 py-0.25 rounded-sm bg-gray-800">
                        -
                    </span>
                    . You can also{" "}
                    <span className="px-1 py-0.25 rounded-sm bg-gray-800">
                        @sushii
                    </span>{" "}
                    the bot as the prefix.
                    <br />
                    Required arguments are in{" "}
                    <span className="px-1 py-0.25 rounded-sm bg-gray-800">
                        [brackets]
                    </span>
                    <br />
                    Optional arguments are in{" "}
                    <span className="px-1 py-0.25 rounded-sm bg-gray-800">
                        (parentheses)
                    </span>
                    <br />
                    Some commands have a{" "}
                    <span className="px-1 py-0.25 rounded-sm bg-gray-800 text-red-400">
                        REQUIRED_PERMISSION
                    </span>{" "}
                    or{" "}
                    <span className="px-1 py-0.25 rounded-sm bg-gray-800 text-orange-300">
                        OPTIONAL_PERMISSION
                    </span>{" "}
                    for the user invoking the command to use additional
                    functionality.
                </p>
                <h2 className="text-2xl my-4">Command Groups</h2>
                <div>
                    {commands.groups.map((group, i) => (
                        <div key={i}>
                            <div className="inline-block">
                                <a
                                    href={`#${group.name}`}
                                    className="text-blue-400 no-underline"
                                >
                                    {group.name}
                                </a>
                                {" -"}
                            </div>
                            <span className="ml-1 prose">
                                <ReactMarkdown
                                    renderers={{
                                        paragraph: "span",
                                        div: "span",
                                    }}
                                >
                                    {group.description}
                                </ReactMarkdown>
                            </span>
                        </div>
                    ))}
                </div>
                <hr className="my-6 border-gray-800" />

                {commands.groups.map((group, i) => (
                    <div key={i} className="my-4">
                        <h2 className="uppercase text-2xl font-light tracking-widest">
                            <a
                                href={`#${group.name}`}
                                className="text-blue-400"
                            >
                                #
                            </a>
                            <span id={group.name} />
                            {group.name}
                        </h2>
                        <ReactMarkdown className="mt-2 mb-4 prose">
                            {group.description}
                        </ReactMarkdown>
                        <li className="list-none px-4 border rounded-md border-gray-800">
                            {group.commands.map((cmd, i) => (
                                <Command key={i} {...cmd} />
                            ))}
                        </li>
                    </div>
                ))}
            </section>
        </div>
    );
}
