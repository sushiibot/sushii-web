import { useRouter } from "next/router";

export default function guildId() {
    const router = useRouter();
    const { guildId } = router.query;

    return <p>Dashboard: {guildId}</p>;
}
