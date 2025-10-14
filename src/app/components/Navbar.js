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

    // Check if user is logged in and listen for auth state changes
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

    // Handle scroll effect
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
                    ? "bg-white shadow-lg py-3"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 shadow-md py-4"
            }`}>
                <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
                    {/* Logo */}
                    <button
                        onClick={() => navigateTo("/")}
                        className="flex items-center group cursor-pointer"
                    >
                        <div className={`rounded-xl px-4 py-2 shadow-md transition-all duration-300 ${
                            scrolled
                                ? "bg-gradient-to-r from-blue-600 to-orange-500"
                                : "bg-white"
                        }`}>
                            <img
                                src="/Website Logo- Simply Punjabi, Ryan.png"
                                alt="Simply Punjabi"
                                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center space-x-2">
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
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 ml-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
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
                                    label="Learn More"
                                    onClick={() => navigateTo("/learn-more")}
                                    scrolled={scrolled}
                                />
                                <li>
                                    <button
                                        onClick={() => navigateTo("/key-functions/auth")}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ml-2 ${
                                            scrolled
                                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                                                : "bg-white text-blue-600 hover:bg-gray-50 shadow-md hover:shadow-lg"
                                        }`}
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span>Login</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigateTo("/key-functions/signup")}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
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
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
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
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
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
                            <p className="text-sm text-blue-200">Welcome back!</p>
                            <p className="font-semibold truncate">{user.email}</p>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Items */}
                <div className="px-4 py-6 space-y-2">
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
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
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
                                label="Learn More"
                                onClick={() => navigateTo("/learn-more")}
                            />
                            <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                                <button
                                    onClick={() => navigateTo("/key-functions/auth")}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>Login</span>
                                </button>
                                <button
                                    onClick={() => navigateTo("/key-functions/signup")}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    scrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
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
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl font-medium transition-all duration-300"
        >
            <div className="text-blue-600">
                {icon}
            </div>
            <span>{label}</span>
        </button>
    );
}