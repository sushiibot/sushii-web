import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MenuToggle } from "./MenuToggle";
import { motion, Variants } from "framer-motion";
import Login from "./Login";

const linksVariants: Variants = {
    open: {
        height: "auto",
        marginTop: "0.5rem",
        transition: {
            duration: 0.2,
            ease: "easeOut",
            staggerChildren: 0.05,
        },
    },
    closed: {
        height: 0,
        marginTop: "0rem",
        transition: {
            duration: 0.2,
            ease: "easeOut",
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const linkVariants: Variants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
        },
    },
    closed: {
        x: -20,
        opacity: 0,
        transition: {
            duration: 0.1,
        },
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
        <div className="">
            <header className="max-w-screen-2xl mx-auto px-6">
                <motion.nav
                    initial={false}
                    className="my-6 md:flex md:items-center md:justify-between"
                    animate={visible ? "open" : "closed"}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <a className="group">
                                    <img
                                        className="h-8 w-8 inline-block
                                            group-hover:animate-spin"
                                        src="/images/sushii.png"
                                    />
                                    <span
                                        className="ml-2 font-medium text-lg
                                        tracking-wide align-middle inline-block
                                        transition-opacity group-hover:opacity-90"
                                    >
                                        sushii
                                    </span>
                                </a>
                            </Link>
                        </div>
                        <MenuToggle toggle={() => toggleVisible()} />
                    </div>
                    <div className="hidden md:inline-block">
                        <ul
                            className={
                                "flex flex-wrap items-center flex-row \
                                transition-colors tracking-widest mt-0 w-full"
                            }
                        >
                            {links.map(({ href, label }, i) => (
                                <li
                                    className="hidden md:inline-block"
                                    key={`${href}${label}`}
                                >
                                    <Link href={href}>
                                        <a
                                            className={
                                                "text-gray-200 hover:bg-gray-800 hover:bg-opacity-10 \
                                                rounded-lg transition-all \
                                                hover:text-blue-400 inline-block p-2 m-2" +
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
                            <span className="ml-4">
                                <Login />
                            </span>
                        </ul>
                    </div>
                    <div className="block md:hidden">
                        <motion.ul
                            className={
                                "flex flex-col \
                                transition-colors text-md \
                                tracking-widest"
                            }
                            variants={linksVariants}
                        >
                            {links.map(({ href, label }, i) => (
                                <motion.li
                                    className="block md:hidden"
                                    key={`${href}${label}`}
                                    variants={linkVariants}
                                >
                                    <Link href={href}>
                                        <a
                                            className={
                                                "text-gray-200 hover:text-blue-400 ml-2 inline-block py-2" +
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
