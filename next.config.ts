import type { NextConfig } from "next";

// GitHub project Pages: set GITHUB_PAGES=true (and optional base path) at build.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (no server runtime).
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Tree-shake icon / motion entry points instead of whole packages.
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "@base-ui/react"],
  },
};

export default nextConfig;
