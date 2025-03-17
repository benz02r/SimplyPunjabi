"use client";

import { usePathname } from "next/navigation";
import ClientNavbar from "./ClientNavbar"; // ✅ Import your navbar component

export default function ClientWrapper({ children }) {
    const pathname = usePathname();

    // Define pages where the navbar should NOT be visible
    const hideNavbarPages = ["/"];

    return (
        <>
            {!hideNavbarPages.includes(pathname) && <ClientNavbar />}
            <main className="container mx-auto">{children}</main>
        </>
    );
}
