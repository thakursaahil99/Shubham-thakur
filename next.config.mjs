/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a second dev server run side by side without sharing the build cache
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
