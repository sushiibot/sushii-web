import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { useBotStatsQuery } from "@sushii-web/graphql";
import { motion } from "framer-motion";

const STAT_NAME_MAP = {
    guild_count: "Servers",
    member_count: "Members",
    commands_executed: "Commands Ran",
};

const STAT_ORDER = {
    guild_count: 0,
    member_count: 1,
    commands_executed: 2,
};

const ContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const StatItemVariant = {
    hidden: {
        opacity: 0,
        y: -6,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: "easeOut",
        },
    },
};

function formatNum(num) {
    return Math.abs(num) > 999
        ? (Math.abs(num) / 1000).toFixed(1) + "k"
        : num.toLocaleString();
}

export default function BotStats() {
    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useBotStatsQuery(client);

    if (status === "loading" || error || !data) {
        return (
            <div className="flex mt-6">
                <div className="mr-6">
                    <p className="text-4xl font-medium opacity-0">
                        placeholder
                    </p>
                    <p className="text-md font-medium text-blue-400 opacity-0">
                        for height
                    </p>
                </div>
            </div>
        );
    }

    data.botStats.nodes.sort((a, b) => STAT_ORDER[a.name] - STAT_ORDER[b.name]);

    return (
        <motion.ul
            className="flex mt-6"
            variants={ContainerVariants}
            initial="hidden"
            animate="show"
        >
            {data.botStats.nodes.map((s) => (
                <motion.li
                    key={s.name}
                    variants={StatItemVariant}
                    className="mr-8 md:mr-16"
                >
                    <p className="text-4xl font-medium">{formatNum(s.count)}</p>
                    <p className="text-md font-medium text-blue-400">
                        {STAT_NAME_MAP[s.name]}
                    </p>
                </motion.li>
            ))}
        </motion.ul>
    );
}
