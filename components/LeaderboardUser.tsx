import { motion } from "framer-motion";

const item = { hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } };

export default function LeaderboardUser({ node, i }: any) {
    // This is NOT the same as Discord's calculation, as they use discriminator
    // instead of ID. But default avatar is used of there isn't a user found
    // so we wouldn't have the discriminator and only have the ID
    const avatarUrl = node.user?.avatarUrl
        ? node.user.avatarUrl
        : `https://cdn.discordapp.com/embed/avatars/${node.userId % 5}.png`;

    const name = node.user?.name ? node.user.name : "unknown";
    const discriminator = node.user?.discriminator
        ? node.user.discriminator
        : 0;

    return (
        <motion.li
            className="flex flex-wrap items-center w-full my-4 p-4 rounded-lg hover:bg-gray-900 hover:bg-opacity-40"
            variants={item}
        >
            <div className="flex-shrink-0 w-72 truncate">
                <span>#{i + 1}</span>
                <img
                    className="w-16 rounded-full inline-block mx-4 whitespace-nowrap overflow-hidden"
                    style={{ textIndent: "100%" }}
                    src={avatarUrl}
                    alt={`${name}'s avatar`}
                />
                <span>
                    {name}
                    <span className="text-gray-700">
                        #{("0000" + discriminator).slice(-4)}
                    </span>
                </span>
            </div>
            <div className="flex-grow p-4 w-full md:w-auto">
                <div>
                    {node.xpProgress.nextLevelXpProgress} /{" "}
                    {node.xpProgress.nextLevelXpRequired} XP
                </div>
                <div className="mt-1 mb-1 w-full h-1 bg-gray-800 rounded">
                    <div
                        className="rounded h-full bg-gradient-to-r from-teal-400 to-blue-500"
                        style={{
                            width: `${node.xpProgress.nextLevelXpPercentage}%`,
                        }}
                    ></div>
                </div>
            </div>
            <div>
                Level
                <br />
                <span className="text-2xl font-medium">
                    {node.xpProgress.level}
                </span>
            </div>
        </motion.li>
    );
}
