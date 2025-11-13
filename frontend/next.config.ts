import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.postimg.cc",
            },
            {
                protocol: "https",
                hostname: "github.com",
            },
        ],
        formats: ["image/avif", "image/webp"],
    },
}

export default nextConfig
