import { motion, AnimatePresence, Variants } from "framer-motion";

const variants: Variants = {
    visible: {
        display: "flex",
        opacity: 1,
        y: 0,
    },
    hidden: {
        opacity: 0,
        y: 24,
        transition: {
            ease: "easeOut",
        },
        transitionEnd: {
            display: "none",
        },
    },
};

interface SaveBarProps {
    visible: boolean;
    onReset: () => void;
    onSave: () => void;
}

export default function SaveBar({ visible, onReset, onSave }: SaveBarProps) {
    return (
        <AnimatePresence>
            <motion.div
                className="w-full left-0 fixed bottom-24 flex justify-center"
                variants={variants}
                initial="hidden"
                animate={visible ? "visible" : "hidden"}
            >
                <div className="p-4 bg-gray-700 rounded-lg h-16">
                    <span className="mr-12">You have unsaved changes!</span>
                    <button className="mr-4" onClick={onReset}>
                        Reset
                    </button>
                    <button
                        className="px-2 py-1 bg-green-500 rounded"
                        onClick={onSave}
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
