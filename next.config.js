/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // note this will eventually just be sanity
    domains: ['ipfs.io', 'gateway.thirdweb.dev'],
  },
};

module.exports = nextConfig;
