import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Configure supported qualities to silence Next.js 16 warning
    qualities: [60, 75, 85, 92],
  },
};

export default nextConfig;
