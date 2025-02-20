"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile menu toggle

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        router.push("/auth"); // Redirect to login after logout
    };

    return (
        <nav className="bg-white shadow-lg py-4 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Brand Name */}
                <Link href="/" className="flex items-center space-x-2">
                    <h1 className="text-3xl font-extrabold text-[var(--primary)] cursor-pointer transition-transform duration-200 hover:scale-105">
                        Simply Punjabi
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6">
                    <NavItem href="/" label="Home" pathname={pathname} />
                    <NavItem href="/profile" label="Profile" pathname={pathname} />
                </ul>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="hidden md:block bg-red-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                    Logout
                </button>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X className="w-7 h-7 text-gray-700" /> : <Menu className="w-7 h-7 text-gray-700" />}
                </button>
            </div>

            {/* Mobile Menu - Slide In Effect */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out md:hidden`}
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Menu"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="mt-16 flex flex-col items-center space-y-6">
                    <NavItem href="/" label="Home" pathname={pathname} isMobile />
                    <NavItem href="/profile" label="Profile" pathname={pathname} isMobile />
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

// ✅ Navigation Item Component
function NavItem({ href, label, pathname, isMobile = false }) {
    return (
        <li>
            <Link
                href={href}
                className={`block px-5 py-2 rounded-full font-semibold transition-transform duration-200 ${
                    pathname === href
                        ? "bg-[var(--primary)] text-white scale-105 shadow-md"
                        : "text-gray-700 hover:text-[var(--primary)] hover:scale-105"
                } ${isMobile ? "text-lg py-3 w-full text-center" : ""}`}
            >
                {label}
            </Link>
        </li>
    );
}
