import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-pg",
    "pg",
    "unpdf",
    "pdfjs-dist",
    "@napi-rs/canvas",
  ],
};

export default nextConfig;
