import type { NextConfig } from "next";

["APP_SECRET", "APP_BACKEND_DNS"].forEach((key: string) => {
  if (typeof process.env[key] === "undefined") {
    throw Error(`Environment [${key}] is required`);
  }
});

const datetime = new Date().toISOString();
const nextConfig: NextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
  reactCompiler: true,
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
