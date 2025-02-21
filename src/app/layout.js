import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper"; // ✅ Import Client Wrapper
import { AuthProvider } from "./context/AuthContext";

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
            <ClientWrapper>{children}</ClientWrapper> {/* ✅ Navbar logic inside Client Component */}
        </AuthProvider>
        </body>
        </html>
    );
}
