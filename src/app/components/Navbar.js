"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile menu toggle
import { supabase } from "@/lib/supabaseClient"; // ✅ Import Supabase

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    // ✅ Check if user is logged in and listen for auth state changes
    useEffect(() => {
        const fetchUser = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            setUser(sessionData?.session?.user || null);
        };

        fetchUser();

        // ✅ Listen for auth state changes (login/logout)
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    // Close the mobile menu when navigating to a new page
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut(); // ✅ Log out from Supabase
        setUser(null); // ✅ Remove user from state immediately
        router.push("/key-functions/auth"); // ✅ Redirect to login page
    };

    return (
        <nav className="bg-[#2563EB] shadow-md py-2 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo (Larger but Fits in Compact Navbar) */}
                <Link href="/" className="flex items-center">
                    <div className="bg-white rounded-md px-3 py-1 shadow-md">
                        <Image
                            src="/Website Logo- Simply Punjabi, Ryan.png"
                            alt="Simply Punjabi Logo"
                            width={140}
                            height={50}
                            priority
                            className="object-contain max-h-12"
                        />
                    </div>
                </Link>



                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-5 text-lg font-semibold text-white">
                    {user ? (
                        <>
                            <NavItem href="/dashboard" label="Dashboard" pathname={pathname} />
                            <NavItem href="/learning" label="Learning" pathname={pathname} />
                            <NavItem href="/profile" label="Profile" pathname={pathname} />
                        </>
                    ) : (
                        <>
                            <NavItem href="/" label="Home" pathname={pathname} />
                            <NavItem href="/learn-more" label="Learn More" pathname={pathname} />
                            <NavItem href="/key-functions/signup" label="Sign Up" pathname={pathname} />
                            <NavItem href="/key-functions/auth" label="Login" pathname={pathname} />
                        </>
                    )}
                </ul>

                {/* Logout Button (Only if user is logged in) */}
                {user && (
                    <button
                        onClick={handleLogout}
                        className="hidden md:block bg-white text-[#2563EB] px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-200 transition transform hover:scale-105"
                    >
                        Logout
                    </button>
                )}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-[#2563EB] shadow-2xl transform ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out md:hidden`}
            >
                <button
                    className="absolute top-4 right-4 text-white hover:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Menu"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="mt-16 flex flex-col items-center space-y-6">
                    {user ? (
                        <>
                            <NavItem href="/dashboard" label="Dashboard" pathname={pathname} isMobile />
                            <NavItem href="/learning" label="Learning" pathname={pathname} isMobile />
                            <NavItem href="/profile" label="Profile" pathname={pathname} isMobile />
                            <button
                                onClick={handleLogout}
                                className="bg-white text-[#2563EB] px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavItem href="/" label="Home" pathname={pathname} isMobile />
                            <NavItem href="/learn-more" label="Learn More" pathname={pathname} isMobile />
                            <NavItem href="/key-functions/signup" label="Sign Up" pathname={pathname} isMobile />
                            <NavItem href="/key-functions/auth" label="Login" pathname={pathname} isMobile />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

// ✅ Updated Navigation Item Component
function NavItem({ href, label, pathname, isMobile = false }) {
    return (
        <li>
            <Link
                href={href}
                className={`block px-4 py-2 rounded-full font-semibold transition-transform duration-200 ${
                    pathname === href
                        ? "bg-white text-[#2563EB] scale-105 shadow-md"
                        : "text-white hover:text-gray-200 hover:scale-105"
                } ${isMobile ? "text-lg py-3 w-full text-center" : ""}`}
            >
                {label}
            </Link>
        </li>
    );
}
