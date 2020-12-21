import Link from "next/link";
import { useRouter } from "next/router";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/commands", label: "Commands" },
    { href: "/help", label: "Help" },
];

export default function Nav() {
    const { pathname } = useRouter();

    return (
        <div className="border-b border-gray-800">
            <header className="max-w-screen-lg mx-auto px-4">
                <nav className="py-6 transition-colors text-md font-medium lowercase tracking-widest">
                    {links.map(({ href, label }) => (
                        <Link key={`${href}${label}`} href={href}>
                            <a
                                className={
                                    "dib text-gray-200 hover:text-blue-400 mr-4" +
                                    (pathname == href ? " text-blue-400" : "")
                                }
                            >
                                {label}
                            </a>
                        </Link>
                    ))}
                </nav>
            </header>
        </div>
    );
}
