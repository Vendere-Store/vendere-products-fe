import {NextFederationPlugin} from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    webpack(config, {isServer}) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'products',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    '/': './src/pages/',
                    './Products': './src/pages/products/index',
                    // './ProductDetails': './src/pages/products/[id]/index',
                },
                shared: {
                    '@headlessui/react': {
                        eager: true,
                        requiredVersion: false,
                        singleton: true,
                    },
                    '@heroicons/react': {
                        eager: true,
                        requiredVersion: false,
                        singleton: true,
                    },
                    // Ensure CSS-in-JS libraries or other shared libraries are correctly configured
                },
            })
        );

        return config;
    },
}

export default nextConfig;
