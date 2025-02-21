"use client";

import { usePathname } from "next/navigation";
import ClientNavbar from "./ClientNavbar"; // ✅ Import your navbar component

export default function ClientWrapper({ children }) {
    const pathname = usePathname();

    // ✅ Hide navbar on these pages
    const hideNavbarPages = ["/", "/auth", "/signup", "/signup-success"];

    return (
        <>
            {!hideNavbarPages.includes(pathname) && <ClientNavbar />}
            <main className="container mx-auto">{children}</main>
        </>
    );
}
