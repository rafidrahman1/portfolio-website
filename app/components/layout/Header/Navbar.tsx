"use client";
import React from "react";
import Link from "next/link";
import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    XMarkIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";

const NAV_MENU = [
    {
        name: "Page",
        icon: RectangleStackIcon,
        link: "/",
    },
    {
        name: "Account",
        icon: UserCircleIcon,
        link: "/projects",
    },
    {
        name: "Docs",
        icon: CommandLineIcon,
        link: "/",
    },
];

function NavItem({ children, link }: { children: React.ReactNode; link?: string }) {
    return (
        <li>
            {link ? (
                <Link href={link} className="flex items-center gap-2 font-medium text-gray-900">
                    {children}
                </Link>
            ) : (
                <span className="flex items-center gap-2 font-medium text-gray-900">
          {children}
        </span>
            )}
        </li>
    );
}

export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) setOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                <span className="text-lg font-bold text-blue-gray-900">Material Tailwind</span>
                <ul className="ml-10 hidden items-center gap-8 lg:flex">
                    {NAV_MENU.map(({ name, icon: Icon, link }) => (
                        <NavItem key={name} link={link}>
                            <Icon className="h-5 w-5" />
                            {name}
                        </NavItem>
                    ))}
                </ul>
                <div className="hidden items-center gap-2 lg:flex">
                    <button className="px-4 py-2 rounded-lg font-medium text-gray-800 hover:bg-gray-100 transition">Sign In</button>
                    <a href="https://www.material-tailwind.com/blocks" target="_blank" rel="noopener noreferrer">
                        <button className="px-4 py-2 rounded-lg font-medium bg-gray-800 text-white hover:bg-gray-700 transition">blocks</button>
                    </a>
                </div>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="ml-auto inline-block lg:hidden p-2 rounded"
                    aria-label="Toggle Menu"
                >
                    {open ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
            </div>
            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-2">
                    <ul className="flex flex-col gap-4">
                        {NAV_MENU.map(({ name, icon: Icon, link }) => (
                            <NavItem key={name} link={link}>
                                <Icon className="h-5 w-5" />
                                {name}
                            </NavItem>
                        ))}
                    </ul>
                    <div className="mt-6 mb-4 flex items-center gap-2">
                        <button className="px-4 py-2 rounded-lg font-medium text-gray-800 hover:bg-gray-100 transition">Sign In</button>
                        <a href="https://www.material-tailwind.com/blocks" target="_blank" rel="noopener noreferrer">
                            <button className="px-4 py-2 rounded-lg font-medium bg-gray-800 text-white hover:bg-gray-700 transition">blocks</button>
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
