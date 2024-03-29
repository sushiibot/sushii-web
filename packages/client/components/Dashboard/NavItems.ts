export enum NavItemType {
    NavItemDivider,
    NavItemSection,
    NavItemPage,
    NavItemDirectLink,
}

interface NavItemBase {
    title: string;
    __isActive?: boolean;
}

interface NavItemDivider {
    type: NavItemType.NavItemDivider;
}

interface NavItemSection extends NavItemBase {
    type: NavItemType.NavItemSection;
    routes: NavItem[];
}

interface NavItemPage extends NavItemBase {
    type: NavItemType.NavItemPage;
    path: string;
    icon: JSX.Element;
}

interface NavItemDirectLink extends NavItemBase {
    type: NavItemType.NavItemDirectLink;
    href: string;
    icon: JSX.Element;
}

export type NavItem =
    | NavItemSection
    | NavItemPage
    | NavItemDirectLink
    | NavItemDivider;
