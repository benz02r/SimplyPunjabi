"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Home, BookOpen, UserCircle, LogIn, UserPlus, LayoutDashboard, GraduationCap, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
    const router = useRouter();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            setUser(sessionData?.session?.user || null);
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setMobileMenuOpen(false);
        router.push("/key-functions/auth");
    };

    const navigateTo = (path) => {
        setMobileMenuOpen(false);
        router.push(path);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-200/60"
                    : "py-4"
            }`}
                 style={!scrolled ? { backgroundColor: '#1B2A4A' } : {}}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-10">
                    {/* Logo */}
                    <button
                        onClick={() => navigateTo("/")}
                        className="flex items-center group cursor-pointer"
                    >
                        <img
                            src="/Website Logo- Simply Punjabi, Ryan.png"
                            alt="Simply Punjabi"
                            className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
                        />
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {user ? (
                            <>
                                <NavItem
                                    icon={<LayoutDashboard className="w-4 h-4" />}
                                    label="Dashboard"
                                    onClick={() => navigateTo("/dashboard")}
                                    scrolled={scrolled}
                                />
                                <NavItem
                                    icon={<GraduationCap className="w-4 h-4" />}
                                    label="Learning"
                                    onClick={() => navigateTo("/learning")}
                                    scrolled={scrolled}
                                />
                                <NavItem
                                    icon={<UserCircle className="w-4 h-4" />}
                                    label="Profile"
                                    onClick={() => navigateTo("/profile")}
                                    scrolled={scrolled}
                                />
                                <li className="ml-2">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                                        style={{ backgroundColor: '#E67E22' }}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Log Out</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <NavItem
                                    icon={<Home className="w-4 h-4" />}
                                    label="Home"
                                    onClick={() => navigateTo("/")}
                                    scrolled={scrolled}
                                />
                                <NavItem
                                    icon={<BookOpen className="w-4 h-4" />}
                                    label="About"
                                    onClick={() => navigateTo("/learn-more")}
                                    scrolled={scrolled}
                                />
                                <li className="ml-2">
                                    <button
                                        onClick={() => navigateTo("/key-functions/auth")}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                                            scrolled
                                                ? "text-white hover:shadow-md"
                                                : "text-white border border-white/30 hover:bg-white/10"
                                        }`}
                                        style={scrolled ? { backgroundColor: '#1B2A4A' } : {}}
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span>Log In</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigateTo("/key-functions/signup")}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                                        style={{ backgroundColor: '#E67E22' }}
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        <span>Sign Up</span>
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className={`w-6 h-6 ${scrolled ? "text-gray-800" : "text-white"}`} />
                        ) : (
                            <Menu className={`w-6 h-6 ${scrolled ? "text-gray-800" : "text-white"}`} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out lg:hidden`}
            >
                {/* Mobile Menu Header */}
                <div className="px-6 py-6" style={{ backgroundColor: '#1B2A4A' }}>
                    <div className="flex items-center justify-between mb-4">
                        <img
                            src="/Website Logo- Simply Punjabi, Ryan.png"
                            alt="Simply Punjabi"
                            className="h-10 w-auto object-contain"
                        />
                        <button
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close Menu"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>
                    {user && (
                        <div className="text-white">
                            <p className="text-sm text-gray-400">Welcome back</p>
                            <p className="font-semibold truncate text-sm">{user.email}</p>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Items */}
                <div className="px-4 py-6 space-y-1">
                    {user ? (
                        <>
                            <MobileNavItem
                                icon={<LayoutDashboard className="w-5 h-5" />}
                                label="Dashboard"
                                onClick={() => navigateTo("/dashboard")}
                            />
                            <MobileNavItem
                                icon={<GraduationCap className="w-5 h-5" />}
                                label="Learning"
                                onClick={() => navigateTo("/learning")}
                            />
                            <MobileNavItem
                                icon={<UserCircle className="w-5 h-5" />}
                                label="Profile"
                                onClick={() => navigateTo("/profile")}
                            />
                            <div className="pt-4 mt-4 border-t border-gray-200">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                                    style={{ backgroundColor: '#E67E22' }}
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <MobileNavItem
                                icon={<Home className="w-5 h-5" />}
                                label="Home"
                                onClick={() => navigateTo("/")}
                            />
                            <MobileNavItem
                                icon={<BookOpen className="w-5 h-5" />}
                                label="About"
                                onClick={() => navigateTo("/learn-more")}
                            />
                            <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                                <button
                                    onClick={() => navigateTo("/key-functions/auth")}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                                    style={{ backgroundColor: '#1B2A4A' }}
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>Log In</span>
                                </button>
                                <button
                                    onClick={() => navigateTo("/key-functions/signup")}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                                    style={{ backgroundColor: '#E67E22' }}
                                >
                                    <UserPlus className="w-5 h-5" />
                                    <span>Sign Up</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

function NavItem({ icon, label, onClick, scrolled }) {
    return (
        <li>
            <button
                onClick={onClick}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    scrolled
                        ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
            >
                {icon}
                <span>{label}</span>
            </button>
        </li>
    );
}

function MobileNavItem({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium text-sm transition-all duration-200"
        >
            <div style={{ color: '#1B2A4A' }}>
                {icon}
            </div>
            <span>{label}</span>
        </button>
    );
}