import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// @hashicorp imports
// local utilities
// import filterContent from "./utils/filter-content";
import flagActiveNodes from "./util/flagActiveNodes";
import useEventListener from "./util/useEventListener";
import { NavItem, NavItemType } from "./NavItems";
import { MenuAlt2Icon } from "@heroicons/react/outline";
import { motion, Variants } from "framer-motion";

const linksVariants: Variants = {
    open: {
        // This required or it will still there but invisible after 2nd time closing
        // https://github.com/framer/motion/issues/599
        display: "block",
        left: "0px",
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    closed: {
        left: "-100%",
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
        transitionEnd: {
            display: "none",
        },
    },
};

interface SideNavProps {
    currentPath: string;
    baseRoute: string;
    navData: NavItem[];
    disableFilter?: boolean;
    children?: JSX.Element;
}

export default function SideNav({
    currentPath,
    baseRoute,
    navData,
    children,
}: SideNavProps) {
    // Set up filtering state
    const [filterInput, setFilterInput] = useState("");
    const [content, setContent] = useState(navData);

    // isMobileOpen controls menu open / close state
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // We want to avoid exposing links to keyboard navigation
    // when the menu is hidden on mobile. But we don't want our
    // menu to flash when hide and shown. To meet both needs,
    // we listen for transition end on the menu element, and when
    // a transition ends and the menu is not open, we set isMenuFullyHidden
    // which translates into a visibility: hidden CSS property
    const menuRef = useRef(null);

    // Close the menu when there is a click outside
    const handleDocumentClick = useCallback(
        (event) => {
            if (!isMobileOpen) return;
            const isClickOutside = !menuRef.current.contains(event.target);
            if (isClickOutside) setIsMobileOpen(false);
        },
        [isMobileOpen]
    );

    useEventListener(
        "click",
        handleDocumentClick,
        typeof window !== "undefined" ? document : null
    );

    // When client-side navigation occurs,
    // we want to close the mobile rather than keep it open
    useEffect(() => {
        setIsMobileOpen(false);
    }, [currentPath]);

    // When path-related data changes, update content to ensure
    // `__isActive` props on each content item are up-to-date
    // Note: we could also reset filter input here, if we don't
    // want to filter input to persist across client-side nav, ie:
    // setFilterInput("")
    useEffect(() => {
        if (!navData) return;

        setContent(flagActiveNodes(navData, currentPath, baseRoute));
    }, [currentPath, navData, baseRoute]);

    return (
        <>
            <div
                className="md:hidden w-full mb-2 border-b border-gray-700
                          bg-gray-1000 fixed z-40"
            >
                <button
                    className="ml-4 py-4"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    <MenuAlt2Icon className="w-6 h-6 inline-block" />
                    <span className="ml-2">
                        {isMobileOpen ? "Hide Server Menu" : "Show Server Menu"}
                    </span>
                </button>
            </div>
            <div className="md:hidden h-14"></div>
            <div className="w-full md:w-64 px-2">
                <div className="relative">
                    {/* Header guild info etc */}
                    {children}
                    <div className="md:hidden">
                        <motion.ul
                            ref={menuRef}
                            variants={linksVariants}
                            animate={!isMobileOpen ? "closed" : "open"}
                            className="fixed z-30 top-32 left-0 h-screen w-64 px-2 bg-gray-1000 
                               border-r border-t border-gray-700"
                        >
                            <NavTree baseRoute={baseRoute} content={content} />
                        </motion.ul>
                    </div>
                    {/* Desktop navbar, not animated, not hidable */}
                    <ul className="hidden md:block top-0 left-0 w-64 px-2">
                        <NavTree baseRoute={baseRoute} content={content} />
                    </ul>
                </div>
            </div>
        </>
    );
}

interface NavTreeProps {
    baseRoute: string;
    content: NavItem[];
}

function NavTree({ baseRoute, content }: NavTreeProps) {
    return (
        <>
            {content.map((item, idx) => {
                //  Dividers
                if (item.type === NavItemType.NavItemDivider) {
                    // eslint-disable-next-line react/no-array-index-key
                    return <Divider key={idx} />;
                }
                // Direct links
                if (item.type === NavItemType.NavItemDirectLink) {
                    return (
                        <DirectLink
                            key={item.title + item.href}
                            title={item.title}
                            icon={item.icon}
                            href={item.href}
                            isActive={item.__isActive}
                        />
                    );
                }
                // Individual pages (leaf nodes)
                if (item.type === NavItemType.NavItemPage) {
                    return (
                        <NavLeaf
                            key={item.path}
                            title={item.title}
                            icon={item.icon}
                            isActive={item.__isActive}
                            url={`${baseRoute}/${item.path}`}
                        />
                    );
                }
                // Otherwise, render a nav branch
                // (this will recurse and render a nav tree)
                return (
                    <NavBranch
                        key={item.title}
                        title={item.title}
                        routes={item.routes}
                        isActive={item.__isActive}
                        baseRoute={baseRoute}
                    />
                );
            })}
        </>
    );
}

function NavBranch({ title, routes, baseRoute, isActive }) {
    const [isOpen, setIsOpen] = useState(false);

    // Ensure categories appear open if they're active
    // or match the current filter
    useEffect(() => setIsOpen(isActive), [isActive]);

    return (
        <li className="">
            <span
                className="pl-4 text-gray-300"
                dangerouslySetInnerHTML={{ __html: title }}
            />

            <ul className="" data-is-open={isOpen}>
                <NavTree baseRoute={baseRoute} content={routes} />
            </ul>
        </li>
    );
}

function NavLeaf({ title, url, isActive, icon }) {
    console.log(title, url, isActive);

    let classes =
        "my-2 h-12 pl-4 rounded-lg w-full inline-block flex items-center";

    if (isActive) {
        classes += " bg-blue-600 text-white";
    } else {
        classes += " hover:bg-white hover:text-gray-900";
    }

    // if the item has a path, it's a leaf node so we render a link to the page
    return (
        <li className="">
            <Link href={url}>
                <a className={classes}>
                    <span className="inline-block align-middle">{icon}</span>
                    <span
                        className="align-middle pl-2"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </a>
            </Link>
        </li>
    );
}

function DirectLink({ title, href, isActive, icon }) {
    return (
        <li>
            <Link href={href}>
                <span className="inline-block align-middle">{icon}</span>
                {title}
            </Link>
        </li>
    );
}

function Divider() {
    return <hr className="my-4 border border-gray-700" />;
}
