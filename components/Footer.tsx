import Link from "next/link";

export default function Footer() {
    return (
        <div className="border-t border-gray-800 mt-4">
            <footer className="max-w-screen-lg mx-auto p-4 py-6">
                <div className="flex flex-wrap justify-between">
                    <div>
                        <p className="text-md font-medium uppercase tracking-widest mb1">
                            sushii 2
                        </p>
                        <p className="text-sm text-gray-400">
                            Source code licensed MIT
                        </p>
                    </div>
                    <div>
                        <Link href="/changelog">
                            <a className="text-blue-400">Changelog</a>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
