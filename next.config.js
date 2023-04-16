

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md'],
  images: { unoptimized: true },
  webpack5: true,
  webpack: (config) => {
      config.resolve.fallback = { fs: false };
  
      return config;
    },
};

module.exports = nextConfig;
