import { LeaderboardQuery } from "@sushii-web/graphql";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import LeaderboardUserPlaceholder from "./LeaderboardUserPlaceholder";
import LeaderboardUser from "./LeaderboardUser";

const animation_list: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
};

interface LeaderboardUserListProps {
    data: LeaderboardQuery;
    guildId?: string;
    loading: boolean;
}

export default function LeaderboardUserList({
    data,
    guildId,
    loading,
}: LeaderboardUserListProps) {
    if (!loading && data && data.timeframeUserLevels.edges.length === 0) {
        return (
            <div className="text-center mt-6 py-6 bg-gray-900 bg-opacity-50 rounded-lg">
                No users were active in this timeframe
            </div>
        );
    }

    return (
        <div>
            <motion.ul
                initial="hidden"
                animate="visible"
                variants={animation_list}
            >
                {loading
                    ? Array(10)
                          .fill(null)
                          .map((_, i) => (
                              <LeaderboardUserPlaceholder key={i} i={i} />
                          ))
                    : data.timeframeUserLevels.edges.map(
                          ({ node }, i: number) => (
                              <LeaderboardUser
                                  key={node.userId}
                                  user={node}
                                  guildId={guildId}
                                  index={i}
                              />
                          )
                      )}
            </motion.ul>
        </div>
    );
}
