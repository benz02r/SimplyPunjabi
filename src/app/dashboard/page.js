"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("User");
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/key-functions/auth"); // Redirect if not logged in
            } else {
                setUser(user);
                fetchUserName(user.id);
            }
        }

        async function fetchUserName(userId) {
            const { data, error } = await supabase
                .from("users")
                .select("name")
                .eq("id", userId)
                .single();

            if (!error && data) {
                setUserName(data.name);
            }
        }

        fetchUser();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-24">
            <div className="text-center max-w-3xl">
                <h1 className="text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Welcome, {userName}! 🎉
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Explore your profile or start learning today.
                </p>
            </div>

            {/* Dashboard Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 max-w-3xl w-full">
                <DashboardCard
                    title="📖 Learning Hub"
                    description="Continue your lessons and improve your skills."
                    link="/learning"
                    bgColor="bg-green-500"
                />
                <DashboardCard
                    title="👤 View Profile"
                    description="Manage your account and track your progress."
                    link="/profile"
                    bgColor="bg-blue-500"
                />
            </div>
        </div>
    );
}

// ✅ Reusable Dashboard Card Component
function DashboardCard({ title, description, link, bgColor }) {
    return (
        <Link href={link} className="w-full">
            <div className={`p-6 ${bgColor} text-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-600 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center`}>
                <h3 className="text-lg md:text-xl font-bold">{title}</h3>
                <p className="text-sm md:text-base">{description}</p>
            </div>
        </Link>
    );
}
