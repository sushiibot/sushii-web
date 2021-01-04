import Link from "next/link";

export default function Footer() {
    return (
        <div className="border-t border-gray-800 mt-4">
            <footer className="max-w-screen-lg mx-auto p-4 py-6">
                <div className="flex flex-wrap">
                    <div className="w-full md:max-w-1/2 mb-4">
                        <p className="text-md font-medium uppercase tracking-widest mb1">
                            sushii 2
                        </p>
                        <p className="text-sm text-gray-400">
                            Bot source code licensed AGPLv3
                            <br />
                            Website source code licensed MIT
                        </p>
                    </div>
                    <div className="w-full md:max-w-1/2">
                        <p className="text-md uppercase tracking-widest mb1 text-gray-400">
                            Links
                        </p>
                        <p>
                            <a
                                href="https://github.com/sushiibot"
                                className="text-blue-200"
                            >
                                GitHub
                            </a>
                            <br />
                            <Link href="/changelog">
                                <a className="text-blue-200">Changelog</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
