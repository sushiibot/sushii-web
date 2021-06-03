import { NavItem, NavItemType } from "./NavItems";

interface DashboardBodyProps {
    guildId: string;
    navData: NavItem[];
    baseRoute: string;
    currentPath: string;
}

export default function DashboardBody({
    guildId,
    baseRoute,
    currentPath,
    navData,
}: DashboardBodyProps) {
    // Remove /dashboard/${guildId} and trailing slash
    currentPath = currentPath.replace(baseRoute, "").replace(/\/$/, "");

    console.log("Current path:", currentPath);

    switch (currentPath) {
        default:
            return <div>Dashboard Home</div>;
    }

    return <div></div>;
}
