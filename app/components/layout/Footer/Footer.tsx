import React from "react";

const LINKS = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Service", href: "#" },
];
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="mt-10 px-8 pt-20">
            <div className="container mx-auto">
                <div className="mt-16 flex flex-wrap items-center justify-center gap-y-4 border-t border-gray-200 py-6 md:justify-between">
                    <p className="text-center font-normal text-gray-700">
                        &copy; {CURRENT_YEAR} Made with Next.js by{" "}
                        <a
                            href="https://www.linkedin.com/in/rafidrahman1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-700 transition-colors"
                        >
                            Rafid Rahman
                        </a>
                        .
                    </p>
                    <ul className="flex gap-8 items-center">
                        {LINKS.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="font-normal text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <button className="px-4 py-2 rounded-lg font-medium bg-gray-800 text-white hover:bg-gray-700 transition">
                                subscribe
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
