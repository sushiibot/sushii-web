import { NavItem, NavItemType } from "./NavItems";
import GuildSideBarLayout from "../Layouts/GuildSideBarLayout";
import {
    CogIcon,
    UserAddIcon,
    NewspaperIcon,
    CodeIcon,
} from "@heroicons/react/outline";

const NAV_DATA: NavItem[] = [
    /*
    {
        title: "Tools",
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
    */
    {
        title: "Settings",
        type: NavItemType.NavItemSection,
        routes: [
            {
                type: NavItemType.NavItemPage,
                title: "General",
                path: "settings/general",
                icon: <CogIcon className="w-6 h-6" />,
            },
            {
                type: NavItemType.NavItemPage,
                title: "Welcome",
                path: "settings/welcome",
                icon: <UserAddIcon className="w-6 h-6" />,
            },
            {
                type: NavItemType.NavItemPage,
                title: "Feeds",
                path: "settings/feeds",
                icon: <NewspaperIcon className="w-6 h-6" />,
            },
            {
                type: NavItemType.NavItemPage,
                title: "Rules",
                path: "settings/rules",
                icon: <CodeIcon className="w-6 h-6" />,
            },
        ],
    },
    /*
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
    */
];

interface DashboardLayoutProps {
    children: JSX.Element[];
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <GuildSideBarLayout
            navData={NAV_DATA}
            baseRouteFn={(guildId) => `/dashboard/${guildId}`}
        >
            {children}
        </GuildSideBarLayout>
    );
}
