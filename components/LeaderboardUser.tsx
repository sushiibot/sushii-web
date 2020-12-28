import { AnimatePresence, motion } from "framer-motion";

const item = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

export default function LeaderboardUser({ node, i, guildId }: any) {
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

    const gradient = guildId
        ? "from-teal-400 to-blue-500"
        : "from-purple-400 via-pink-500 to-red-500";

    return (
        <AnimatePresence>
            <motion.li
                className="flex flex-wrap items-center w-full my-4 p-2 px-4 rounded-lg group hover:bg-gray-100 hover:bg-opacity-90"
                variants={item}
            >
                <div className="flex-shrink-0 w-72 truncate text-gray-700">
                    <span className="text-gray-400 group-hover:text-gray-800">
                        #{i + 1}
                    </span>
                    <img
                        className="w-16 rounded-full inline-block mx-4 whitespace-nowrap overflow-hidden"
                        style={{ textIndent: "100%" }}
                        src={avatarUrl.replace("?size=1024", "?size=128")}
                        alt={`${name}'s avatar`}
                    />
                    <span className="text-gray-700 group-hover:text-gray-500">
                        <span className="text-gray-200 group-hover:text-gray-800">
                            {name}
                        </span>
                        <span>#{("0000" + discriminator).slice(-4)}</span>
                    </span>
                </div>
                <div className="flex-grow p-4 w-full md:w-auto">
                    <div className="group-hover:text-gray-800">
                        {node.xpProgress.nextLevelXpProgress} /{" "}
                        {node.xpProgress.nextLevelXpRequired} XP
                    </div>
                    <div className="mt-1 mb-1 w-full h-1 bg-gray-800 group-hover:bg-gray-400 rounded">
                        <div
                            className={`rounded h-full bg-gradient-to-r ${gradient}`}
                            style={{
                                width: `${node.xpProgress.nextLevelXpPercentage}%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="group-hover:text-gray-800 pl-4 h-20 flex items-center">
                    {node.xpDiff ? (
                        <div>
                            XP Gain
                            <br />
                            <span className="text-md font-medium">
                                +{node.xpDiff} XP
                            </span>
                            <br />
                            {node.timeframeGainedLevels &&
                                node.timeframeGainedLevels > 0 && (
                                    <span className="text-sm text-gray-400 group-hover:text-gray-600">
                                        + {node.timeframeGainedLevels} Levels
                                    </span>
                                )}
                        </div>
                    ) : (
                        <div>
                            Level
                            <br />
                            <span className="text-2xl font-medium">
                                {node.xpProgress.level}
                            </span>
                        </div>
                    )}
                </div>
            </motion.li>
        </AnimatePresence>
    );
}
