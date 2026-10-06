import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to out/, which any static host can serve.
const nextConfig: NextConfig = {
  output: "export",
  // team/index.html instead of team.html, so any static host serves clean URLs.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
