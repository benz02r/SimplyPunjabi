import { Inter, JetBrains_Mono } from "next/font/google"; // ✅ Import new fonts
import "./globals.css";
import ClientNavbar from "./components/ClientNavbar"; // ✅ Client-side Navbar
import { AuthProvider } from "./context/AuthContext"; // ✅ Import Authentication Provider

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
    title: "Punjabi Learning",
    description: "Interactive Punjabi Learning Platform",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <AuthProvider> {/* ✅ Wrap everything inside the AuthProvider */}
            <ClientNavbar /> {/* ✅ Navbar remains visible except on home */}
            <main className="container mx-auto">{children}</main>
        </AuthProvider>
        </body>
        </html>
    );
}
