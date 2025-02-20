"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "/src/lib/supabaseClient";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            // Redirect to login page if not authenticated and not already on auth/signup
            if (!user && pathname !== "/auth" && pathname !== "/signup") {
                router.push("/auth");
            }
        };

        getUser();
    }, [pathname, router]);

    return <>{user ? children : null}</>; // Render only if user exists
}
