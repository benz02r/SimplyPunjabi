"use client"; // ✅ Ensures it runs on the client-side

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientNavbar() {
    const pathname = usePathname();

    // ✅ Hide Navbar on the home page
    return pathname !== "/" && <Navbar />;
}
