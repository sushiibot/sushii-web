import Link from "next/link";
import { useRouter } from "next/router";
import DashboardBody from "../../../components/Dashboard/DashboardBody";
import { NavItem, NavItemType } from "../../../components/Dashboard/NavItems";
import SideNav from "../../../components/Dashboard/SideNav";
import Icon from "../../../components/Icon";

const NAV_DATA: NavItem[] = [
    {
        title: "Admin tools",
        type: NavItemType.NavItemSection,
        routes: [
            {
                type: NavItemType.NavItemPage,
                title: "Overview",
                path: "",
                icon: <Icon type="Home" />,
            },
            {
                type: NavItemType.NavItemPage,
                title: "Mod Logs",
                path: "logs/moderation",
                icon: <Icon type="ShieldCheck" />,
            },
        ],
    },
    { type: NavItemType.NavItemDivider },
    {
        title: "Settings",
        type: NavItemType.NavItemSection,
        routes: [
            {
                type: NavItemType.NavItemPage,
                title: "General",
                path: "settings/general",
                icon: <Icon type="Cog" />,
            },
            {
                type: NavItemType.NavItemPage,
                title: "Welcome",
                path: "settings/welcome",
                icon: <Icon type="UserAdd" />,
            },
            {
                type: NavItemType.NavItemPage,
                title: "Feeds",
                path: "settings/feeds",
                icon: <Icon type="Newspaper" />,
            },
        ],
    },
    { type: NavItemType.NavItemDivider },
    {
        title: "Content",
        type: NavItemType.NavItemSection,
        routes: [
            {
                type: NavItemType.NavItemPage,
                title: "Tags",
                path: "tags",
                icon: <Icon type="Tag" />,
            },
            {
                type: NavItemType.NavItemPage,
                title: "Leaderboard",
                path: "leaderboard",
                icon: <Icon type="UserAdd" />,
            },
        ],
    },
];

export default function guildDashboard() {
    const router = useRouter();
    const currentPath = router.asPath;
    const guildId = Array.isArray(router.query.guildId)
        ? router.query.guildId.join("")
        : router.query.guildId;

    const baseRoute = `/dashboard/${guildId}`;

    return (
        <section className="flex-grow max-w-screen-2xl min-h-full flex">
            <SideNav
                navData={NAV_DATA}
                baseRoute={baseRoute}
                currentPath={currentPath}
            />
            <div className="ml-4">
                <div className="hidden">
                    <Link href="/dashboard">
                        <a>
                            <svg
                                className="w-4 h-4 inline mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Back to server list
                        </a>
                    </Link>
                </div>
                <DashboardBody />
            </div>
        </section>
    );
}
