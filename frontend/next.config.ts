import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        domains: ["i.postimg.cc", "github.com"],
        formats: ["image/avif", "image/webp"],
    },
}

export default nextConfig
