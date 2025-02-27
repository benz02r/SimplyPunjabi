"use client";

import ClientNavbar from "./ClientNavbar"; // ✅ Import your navbar component

export default function ClientWrapper({ children }) {
    return (
        <>
            <ClientNavbar /> {/* ✅ Always render the navbar */}
            <main className="container mx-auto">{children}</main>
        </>
    );
}
