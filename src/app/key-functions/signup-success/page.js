"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupSuccess() {
    const router = useRouter();

    // ✅ Automatically redirect to login after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/key-functions/auth");
        }, 5000); // Redirect after 5 seconds

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200 text-center">
                <h1 className="text-3xl font-extrabold text-[var(--primary)]">✅ Signup Successful!</h1>
                <p className="text-gray-600 mt-4">
                    We&apos;ve sent you an email verification link. Please check your inbox to verify your account.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Not seeing the email? Check your spam folder or{" "}
                    <a href="/auth" className="text-[var(--primary)] font-semibold hover:underline">log in</a>.
                </p>

                {/* Redirect message */}
                <p className="text-sm text-gray-500 mt-6">Redirecting to login in 5 seconds...</p>

                {/* Manual Login Button */}
                <a href="/key-functions/auth">
                    <button className="mt-4 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition">
                        Go to Login
                    </button>
                </a>
            </div>
        </div>
    );
}
