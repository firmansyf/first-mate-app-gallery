import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["bcryptjs"],
  images: {
    remotePatterns: [
      {
        protocol: (process.env.MINIO_USE_SSL === "true" ? "https" : "http") as "http" | "https",
        hostname: process.env.MINIO_ENDPOINT || "localhost",
      },
    ],
  },
};

export default nextConfig;
