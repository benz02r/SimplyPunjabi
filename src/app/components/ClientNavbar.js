"use client"; // ✅ Ensures it runs on the client-side

import Navbar from "./Navbar";

export default function ClientNavbar() {
    return <Navbar />; // ✅ Always render the navbar on all pages
}
