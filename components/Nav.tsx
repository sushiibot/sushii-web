import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MenuToggle } from "./MenuToggle";
import { motion } from "framer-motion";

const linksVariants = {
    open: {
        transition: { staggerChildren: 0.05, delayChildren: 0 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const linkVariants = {
    open: {
        y: 0,
        opacity: 1,
    },
    closed: {
        y: 20,
        opacity: 0,
    },
};

const links = [
    { href: "/about", label: "About" },
    { href: "/commands", label: "Commands" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/help", label: "Help" },
];

export default function Nav() {
    const { pathname } = useRouter();
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className="border-b border-gray-800">
            <header className="max-w-screen-lg mx-auto px-4">
                <motion.nav
                    initial={false}
                    className="py-6 sm:flex sm:items-center"
                    animate={visible ? "open" : "closed"}
                >
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <img
                                className="h-8 w-8 inline-block"
                                src="/images/sushii2.png"
                            />
                        </Link>
                        <MenuToggle toggle={() => toggleVisible()} />
                    </div>
                    <motion.ul
                        className={
                            "flex flex-wrap sm:items-center flex-col sm:flex-row \
                            transition-colors text-md font-medium \
                            lowercase tracking-widest" +
                            (visible ? " mt-4 sm:mt-0" : "")
                        }
                        variants={linksVariants}
                    >
                        {links.map(({ href, label }, i) => (
                            <motion.li
                                key={`${href}${label}`}
                                variants={linkVariants}
                            >
                                <Link href={href}>
                                    <a
                                        className={
                                            "text-gray-200 hover:text-blue-400 mx-2 sm:mx-4" +
                                            (pathname == href
                                                ? " text-blue-400"
                                                : " ") +
                                            (visible
                                                ? " inline-block py-2 sm:py-0"
                                                : " hidden sm:inline-block")
                                        }
                                        onClick={() => setVisible(false)}
                                    >
                                        {label}
                                    </a>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.nav>
            </header>
        </div>
    );
}
