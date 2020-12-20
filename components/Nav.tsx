import Link from "next/link";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/commands", label: "Commands" },
    { href: "/help", label: "Help" },
];

export default function Nav() {
    return (
        <header className="max-w-screen-lg mx-auto">
            <nav className="p-4 text-md font-medium lowercase tracking-widest">
                {links.map(({ href, label }) => (
                    <Link key={`${href}${label}`} href={href}>
                        <a className="dib hover:text-blue-400 mr-4">{label}</a>
                    </Link>
                ))}
            </nav>
        </header>
    );
}
