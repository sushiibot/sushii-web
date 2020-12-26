import { motion, Variants } from "framer-motion";

const item: Variants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

export default function LeaderboardUserPlaceholder({ i }: any) {
    return (
        <motion.li variants={item}>
            <motion.div
                className="flex flex-wrap items-center w-full my-4 p-4 rounded-lg"
                animate={{
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{ delay: i * 0.1, duration: 1, repeat: Infinity }}
            >
                <div className="flex items-center flex-shrink-0 w-72">
                    <span className="text-gray-400">#{i + 1}</span>
                    <div className="bg-gray-700 w-16 h-16 rounded-full inline-block mx-4"></div>
                    <div className="bg-gray-700 w-32 h-4 rounded-full inline-block"></div>
                </div>
                <div className="flex-grow p-4 w-full md:w-auto">
                    <div className="bg-gray-700 h-3 w-24 rounded-full"></div>
                    <div className="mt-1 mb-1 w-full h-1 bg-gray-800 rounded"></div>
                </div>
                <div className="w-10">
                    <div className="bg-gray-900 h-3 w-14 rounded-full mb-2"></div>
                    <div className="bg-gray-800 h-6 w-16 rounded-full"></div>
                </div>
            </motion.div>
        </motion.li>
    );
}
