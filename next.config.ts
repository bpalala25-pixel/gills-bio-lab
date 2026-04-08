import type { NextConfig } from "next";
import path from "node:path";

const isOrchids = process.env.NODE_ENV === "development";

// Only load orchids loader in dev to avoid crashing on Vercel
const orchidsConfig = isOrchids ? (() => {
  try {
    const loaderPath = require.resolve("orchids-visual-edits/loader.js");
    return {
      outputFileTracingRoot: path.resolve(__dirname, "../../"),
      allowedDevOrigins: ["*.orchids.page"],
      turbopack: {
        rules: {
          "*.{jsx,tsx}": {
            loaders: [loaderPath],
          },
        },
      },
    };
  } catch {
    return {};
  }
})() : {};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...orchidsConfig,
} as NextConfig;

export default nextConfig;
