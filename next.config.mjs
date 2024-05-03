import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    webpack(config, { isServer }) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'remote',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    '/': './src/pages/',
                    './Products': './src/pages/products/index', // Adjust as necessary for what you want to expose
                    './ProductDetails/': './src/pages/products/[id]', // Adjust as necessary for what you want to expose
                },
                shared: {
                    // specify shared dependencies
                    // read more in Shared Dependencies section
                },
            })
        );

        return config;
    },
}

export default nextConfig;
