import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// @hashicorp imports
// local utilities
// import filterContent from "./utils/filter-content";
import flagActiveNodes from "./util/flagActiveNodes";
import useEventListener from "./util/useEventListener";
import { NavItem, NavItemType } from "./NavItems";

interface SideNavProps {
    currentPath: string;
    baseRoute: string;
    navData: NavItem[];
    disableFilter?: boolean;
}

export default function SideNav({
    currentPath,
    baseRoute,
    navData,
}: SideNavProps) {
    // Set up filtering state
    const [filterInput, setFilterInput] = useState("");
    const [content, setContent] = useState(navData);

    // isMobileOpen controls menu open / close state
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // isMobileFullyHidden reflects if the menu is fully transitioned to a hidden state
    const [isMenuFullyHidden, setIsMenuFullyHidden] = useState(true);
    // We want to avoid exposing links to keyboard navigation
    // when the menu is hidden on mobile. But we don't want our
    // menu to flash when hide and shown. To meet both needs,
    // we listen for transition end on the menu element, and when
    // a transition ends and the menu is not open, we set isMenuFullyHidden
    // which translates into a visibility: hidden CSS property
    const menuRef = useRef(null);
    const handleMenuTransitionEnd = useCallback(() => {
        setIsMenuFullyHidden(!isMobileOpen);
    }, [isMobileOpen, setIsMenuFullyHidden]);
    useEventListener("transitionend", handleMenuTransitionEnd, menuRef.current);

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
        <div className="w-64 overflow-y-scroll border-r border-gray-600 px-2">
            <button
                className="hidden"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>{" "}
                    Menu
                </span>
            </button>
            <ul
                ref={menuRef}
                data-is-mobile-hidden={!isMobileOpen && isMenuFullyHidden}
                data-is-mobile-open={isMobileOpen}
            >
                <NavTree baseRoute={baseRoute} content={content} />
            </ul>
        </div>
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
        "my-2 h-12 pl-4 rounded-lg w-full inline-block flex items-center \
                   hover:bg-white hover:text-gray-900";

    if (isActive) {
        classes += " bg-blue-600 text-white";
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
