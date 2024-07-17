/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // experimental: {
    //     appDir: true,
    // },
    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.externals = [...config.externals, "closevector-hnswlib-node"]
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    },
};

export default nextConfig;