import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper"; // ✅ Import Client Wrapper
import { AuthProvider } from "@/app/key-functions/context/AuthContext";
import { Analytics } from "@vercel/analytics/react"; // ✅ Import Vercel Analytics
import { SpeedInsights } from "@vercel/speed-insights/next"; // ✅ Import Vercel Speed Insights

// New Fonts
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Simply Punjabi",
    description: "The simple way to learn Punjabi",
    icons: {
        icon: "/favicon.ico", // Standard favicon
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png", // Apple Touch Icon for iOS
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <AuthProvider> {/* ✅ Wrap everything inside the AuthProvider */}
            <ClientWrapper>{children}</ClientWrapper> {/* ✅ Navbar logic inside Client Component */}
            <Analytics /> {/* ✅ Vercel Analytics to track user activity */}
            <SpeedInsights /> {/* ✅ Vercel Speed Insights to monitor performance */}
        </AuthProvider>
        </body>
        </html>
    );
}
