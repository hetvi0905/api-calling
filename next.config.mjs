/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },

  reactStrictMode: false,
  images: {
    // formats: [
    //   'image/avif',
    //   'image/webp',
    //   // 'image/svg',
    //   // 'image/jpg',
    //   // 'image/jpeg',
    // ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cohort.social",
        port: "",
        // pathname: '/image/upload/**',
      },
      {
        protocol: "https",
        hostname: "place.oscod.dev",
        port: "",
        // pathname: '/image/upload/**',
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts",
      },
    },
  },
};

export default nextConfig;
