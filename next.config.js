/// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    compiler: {
        emotion: true
    }
};

module.exports = nextConfig;
