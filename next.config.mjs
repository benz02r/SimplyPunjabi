/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Disables ESLint during production builds
    },
};

export default nextConfig;
