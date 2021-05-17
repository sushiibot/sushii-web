import Link from "next/link";
import { useGraphQLQuery } from "../../lib/useGraphQLQuery";
import { getGuildIconUrl, getGuildBannerUrl } from "../../lib/discordCdn";
import { useCachedGuildQuery } from "@sushii-web/graphql";
import { useRouter } from "next/router";
import { NavItem, NavItemType } from "../Dashboard/NavItems";
import SideNav from "../Dashboard/SideNav";
import { TrendingUpIcon, TagIcon } from "@heroicons/react/outline";
import Image from "../Image";

const NAV_DATA: NavItem[] = [
    {
        title: "",
        type: NavItemType.NavItemSection,
        routes: [
            {
                type: NavItemType.NavItemPage,
                title: "Leaderboard",
                path: "leaderboard",
                icon: <TrendingUpIcon className="w-6 h-6" />,
            },
            {
                type: NavItemType.NavItemPage,
                title: "Tags",
                path: "tags",
                icon: <TagIcon className="w-6 h-6" />,
            },
        ],
    },
];

interface DashboardLayoutProps {
    children: JSX.Element[];
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const router = useRouter();
    const currentPath = router.asPath;
    const guildId = Array.isArray(router.query.guildId)
        ? router.query.guildId.join("")
        : router.query.guildId;

    const baseRoute = `/server/${guildId}`;

    const client = useGraphQLQuery();
    const { status, data, error, isFetching } = useCachedGuildQuery(client, {
        guildId,
    });

    return (
        <section
            className="flex-grow max-w-screen-2xl w-full mx-auto min-h-full
                       flex flex-col md:flex-row"
        >
            <div>
                <SideNav
                    navData={NAV_DATA}
                    baseRoute={baseRoute}
                    currentPath={currentPath}
                >
                    <div className="mt-4 w-full flex items-center">
                        <div className="w-full max-w-sm px-2">
                            <div className="aspect-w-16 aspect-h-9 -z-5">
                                {data?.cachedGuild.banner ? (
                                    <Image
                                        wrapperClassName="aspect-w-16 aspect-h-9"
                                        src={getGuildBannerUrl(
                                            guildId,
                                            data.cachedGuild.banner
                                        )}
                                        alt={data.cachedGuild.name + " banner"}
                                        className="object-cover rounded"
                                    />
                                ) : (
                                    <div
                                        className="object-cover bg-gray-800
                                            rounded flex items-center 
                                            justify-center text-gray-600"
                                    >
                                        meow
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 px-2 flex items-end">
                                {data?.cachedGuild ? (
                                    <>
                                        <img
                                            className="w-16 h-16 -mt-16 mr-4 rounded-full ring-4 ring-gray-1000"
                                            src={getGuildIconUrl(
                                                guildId,
                                                data.cachedGuild.icon
                                            )}
                                            alt="Guild Icon URL"
                                        />
                                        <h1 className="text-xl pb-2">
                                            {data.cachedGuild
                                                ? data.cachedGuild.name
                                                : guildId}
                                        </h1>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="w-16 h-16 -mt-16 mr-4
                                            rounded-full ring-4 ring-gray-1000 bg-gray-700"
                                        />
                                        <h1 className="text-xl pb-2">
                                            Loading
                                        </h1>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </SideNav>
            </div>
            <div className="px-4 pt-6 w-full flex flex-col">{children}</div>
        </section>
    );
}
