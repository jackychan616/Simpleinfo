

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md'],
  images: { unoptimized: true },
  distDir: 'build',
};

module.exports = nextConfig;
