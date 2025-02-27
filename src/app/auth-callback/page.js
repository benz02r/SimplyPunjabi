"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
    const router = useRouter();
    const [error, setError] = useState(null);

    useEffect(() => {
        async function handleAuth() {
            // ✅ Automatically log in the user if they have an active session
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                setError("Authentication failed. Please try again.");
                return;
            }

            if (data?.session?.user) {
                setTimeout(() => {
                    router.push("/dashboard"); // ✅ Redirect user to the dashboard
                }, 2000);
            } else {
                setError("No active session found.");
            }
        }

        handleAuth();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-center px-6">
            {error ? (
                <>
                    <h1 className="text-3xl font-bold text-red-500">❌ Authentication Failed</h1>
                    <p className="mt-3 text-lg text-gray-700">{error}</p>
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-[var(--primary)]">✅ Logging You In...</h1>
                    <p className="mt-3 text-lg text-gray-700">
                        Please wait while we log you in automatically.
                    </p>
                </>
            )}
        </div>
    );
}
