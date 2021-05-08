import { motion } from "framer-motion";
import { LeaderboardQuery } from "@sushii-web/graphql";

const item = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

interface LeaderboardUserProps {
    user: LeaderboardQuery["timeframeUserLevels"]["edges"][0]["node"];
    index: number;
    guildId: string;
}

export default function LeaderboardUser({
    user,
    index,
    guildId,
}: LeaderboardUserProps) {
    // This is NOT the same as Discord's calculation, as they use discriminator
    // instead of ID. But default avatar is used of there isn't a user found
    // so we wouldn't have the discriminator and only have the ID
    const avatarUrl = user.avatarUrl
        ? user.avatarUrl
        : `https://cdn.discordapp.com/embed/avatars/${user.userId % 5}.png`;

    const name = user.username ? user.username : "unknown";
    const discriminator = user.discriminator ? user.discriminator : 0;

    const gradient = guildId
        ? "from-teal-400 to-blue-500"
        : "from-purple-400 via-pink-500 to-red-500";

    let topUserStyle = {};

    switch (index) {
        case 0:
            topUserStyle = {
                backgroundImage:
                    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                color: "transparent",
                fontWeight: 500,
            };
            break;
        case 1:
            topUserStyle = {
                backgroundImage:
                    "linear-gradient(135deg, #93a5cf 0%, #e4efe9 100%)",
                color: "transparent",
                fontWeight: 500,
            };
            break;
        case 2:
            topUserStyle = {
                backgroundImage:
                    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                color: "transparent",
                fontWeight: 500,
            };
            break;
    }

    return (
        <motion.li
            className="flex flex-wrap items-center w-full my-4 p-2 px-4 rounded-lg group hover:bg-gray-100 hover:bg-opacity-90"
            variants={item}
        >
            <div className="flex-shrink-0 w-72 truncate text-gray-700">
                <div className="inline-block bg-gray-700 px-2 py-1 rounded-md">
                    <span
                        className="text-gray-400 group-hover:text-gray-400 bg-clip-text"
                        style={topUserStyle}
                    >
                        #{index + 1}
                    </span>
                </div>
                <img
                    className="w-16 rounded-full inline-block mx-4 whitespace-nowrap overflow-hidden"
                    style={{ textIndent: "100%" }}
                    src={avatarUrl.replace("?size=1024", "?size=128")}
                    alt={`${name}'s avatar`}
                />
                <span className="text-gray-500 group-hover:text-gray-400">
                    <span className="text-gray-200 group-hover:text-gray-800">
                        {name}
                    </span>
                    <span>#{("0000" + discriminator).slice(-4)}</span>
                </span>
            </div>
            <div className="flex-grow p-4 w-full md:w-auto">
                <div className="group-hover:text-gray-800">
                    {user.nextLevelXpProgress} / {user.nextLevelXpRequired} XP
                </div>
                <div className="mt-1 mb-1 w-full h-1 bg-gray-700 group-hover:bg-gray-400 rounded">
                    <div
                        className={`rounded h-full bg-gradient-to-r ${gradient}`}
                        style={{
                            width: `${Math.floor(
                                (user.nextLevelXpProgress /
                                    user.nextLevelXpRequired) *
                                    100
                            )}%`,
                        }}
                    ></div>
                </div>
            </div>
            <div className="group-hover:text-gray-800 pl-4 h-20 flex items-center">
                {user.xpDiff ? (
                    <div>
                        XP Gain
                        <br />
                        <span className="text-md font-medium">
                            +{user.xpDiff} XP
                        </span>
                        <br />
                        {user.gainedLevels && user.gainedLevels > 0 && (
                            <span className="text-sm text-gray-400 group-hover:text-gray-600">
                                + {user.gainedLevels} Levels
                            </span>
                        )}
                    </div>
                ) : (
                    <div>
                        Level
                        <br />
                        <span className="text-2xl font-medium">
                            {user.currentLevel}
                        </span>
                    </div>
                )}
            </div>
        </motion.li>
    );
}
