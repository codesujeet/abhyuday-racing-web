import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to out/, which any static host can serve.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // This project lives inside the old site repo; keep Turbopack rooted here.
  turbopack: { root: __dirname },
};

export default nextConfig;
