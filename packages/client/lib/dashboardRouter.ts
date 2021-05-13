import { useRouter } from "next/router";

export function useDashboardRouter() {
    const router = useRouter();
    const guildId = Array.isArray(router.query.guildId)
        ? router.query.guildId.join("")
        : router.query.guildId;

    const baseRoute = `/dashboard/${guildId}`;
    const currentPath = router.asPath.replace(baseRoute, "").replace(/\/$/, "");

    return { router, guildId, currentPath, baseRoute };
}
