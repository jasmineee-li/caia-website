import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/programs", destination: "/join#programs", permanent: true },
      { source: "/get-involved", destination: "/join", permanent: true },
      { source: "/cs1998", destination: "/programs/cs1998", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
  },
};

export default nextConfig;
