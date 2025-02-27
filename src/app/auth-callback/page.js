"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
    const router = useRouter();
    const [error, setError] = useState(null);

    useEffect(() => {
        async function handleAuth() {
            // ✅ Exchange URL token for an active session
            const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);

            if (error) {
                setError("Authentication failed. Please try again.");
                return;
            }

            // ✅ User is now logged in → Redirect to dashboard
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        }

        handleAuth();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-center px-6">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md w-full">
                {error ? (
                    <>
                        <h1 className="text-3xl font-bold text-red-600">❌ Authentication Failed</h1>
                        <p className="mt-3 text-lg text-gray-700">{error}</p>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-[var(--primary)]">✅ Logging You In...</h1>
                        <p className="mt-3 text-lg text-gray-700">
                            Please wait while we authenticate your session.
                        </p>
                        {/* Animated Loader */}
                        <div className="mt-6">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
