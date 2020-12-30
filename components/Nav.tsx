import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MenuToggle } from "./MenuToggle";
import { motion, Variants } from "framer-motion";

const linksVariants: Variants = {
    open: {
        height: "auto",
        transition: { staggerChildren: 0.05 },
    },
    closed: {
        height: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const linkVariants: Variants = {
    open: {
        y: 0,
        opacity: 1,
    },
    closed: {
        x: -20,
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
                    <div className="hidden sm:inline-block">
                        <ul
                            className={
                                "flex flex-wrap sm:items-center flex-col sm:flex-row \
                            transition-colors text-md font-medium \
                            lowercase tracking-widest mt-4 sm:mt-0"
                            }
                        >
                            {links.map(({ href, label }, i) => (
                                <li
                                    className="hidden sm:inline-block"
                                    key={`${href}${label}`}
                                >
                                    <Link href={href}>
                                        <a
                                            className={
                                                "text-gray-200 hover:text-blue-400 inline-block py-0 mx-4" +
                                                (pathname == href
                                                    ? " text-blue-400"
                                                    : " ")
                                            }
                                        >
                                            {label}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="block sm:hidden">
                        <motion.ul
                            className={
                                "flex flex-col \
                                transition-colors text-md font-medium \
                                lowercase tracking-widest"
                            }
                            variants={linksVariants}
                        >
                            {links.map(({ href, label }, i) => (
                                <motion.li
                                    className="block sm:hidden"
                                    key={`${href}${label}`}
                                    variants={linkVariants}
                                >
                                    <Link href={href}>
                                        <a
                                            className={
                                                "text-gray-200 hover:text-blue-400 ml-8 inline-block py-2" +
                                                (pathname == href
                                                    ? " text-blue-400"
                                                    : " ")
                                            }
                                            onClick={() => setVisible(false)}
                                        >
                                            {label}
                                        </a>
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </motion.nav>
            </header>
        </div>
    );
}
