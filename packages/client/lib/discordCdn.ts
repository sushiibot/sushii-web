const IMAGE_BASE_URL = "https://cdn.discordapp.com";

export function getGuildIconUrl(
    id: string,
    icon: string | undefined
): string | undefined {
    if (!icon) {
        return undefined;
    }

    if (icon.startsWith("a_")) {
        return IMAGE_BASE_URL + `/icons/${id}/${icon}.gif`;
    }

    return IMAGE_BASE_URL + `/icons/${id}/${icon}.jpg`;
}

export function getGuildBannerUrl(
    id: string,
    banner: string | undefined,
    size: number = 1024
): string | undefined {
    if (!banner) {
        return undefined;
    }

    return (
        IMAGE_BASE_URL +
        `/banners/${id}/${banner}.jpg${size ? "?size=" + size : ""}`
    );
}
