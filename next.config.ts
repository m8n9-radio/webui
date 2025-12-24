import type { NextConfig } from "next";

["APP_SECRET", "APP_BACKEND_HOST", "ALLOWED_ORIGINS"].forEach((key: string) => {
  if (typeof process.env[key] === "undefined") {
    throw Error(`Environment [${key}] is required`);
  }
});

const datetime = new Date().toISOString();

const nextConfig: NextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins: (() =>
        (process.env.ALLOWED_ORIGINS || "").split(",").filter(Boolean))(),
      bodySizeLimit: "2mb",
    },
  },
  cacheComponents: true,
  cleanDistDir: true,
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      hmrRefreshes: process.env.NODE_ENV === "development",
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
  output: "standalone",
  generateBuildId: () => `build@${datetime}`,
  deploymentId: `deploy@${datetime}`,
  compiler:
    process.env.NODE_ENV === "development"
      ? undefined
      : {
          removeConsole: {
            exclude: ["error"],
          },
        },
};

export default nextConfig;
