import { NavItem, NavItemType } from "../NavItems";

function addIsActiveToNodes(
    navNodes: NavItem[],
    currentPath: string,
    baseRoute: string
) {
    return navNodes
        .slice()
        .map((node) => addIsActiveToNode(node, currentPath, baseRoute));
}

function addIsActiveToNode(
    navNode: NavItem,
    currentPath: string,
    baseRoute: string
) {
    console.log(currentPath, baseRoute);

    // If any children are active, then section is active
    if (navNode.type === NavItemType.NavItemSection) {
        const routesWithActive: any[] = addIsActiveToNodes(
            navNode.routes,
            currentPath,
            baseRoute
        );
        // At least one active
        const isActive = routesWithActive.some((r) => r.__isActive);

        return { ...navNode, routes: routesWithActive, __isActive: isActive };
    }

    // If path is same as current path
    if (navNode.type === NavItemType.NavItemPage) {
        // Compare with trailing slash removed
        const isActive =
            `${baseRoute}/${navNode.path}`.replace(/\/$/, "") === currentPath;
        return { ...navNode, __isActive: isActive };
    }

    // If it's a direct link,
    // return true if the path matches the router.pathname
    if (navNode.type === NavItemType.NavItemDirectLink) {
        const isActive = navNode.href === currentPath;
        return { ...navNode, __isActive: isActive };
    }

    // Otherwise, it's a divider, so return unmodified
    return navNode;
}

export default addIsActiveToNodes;
