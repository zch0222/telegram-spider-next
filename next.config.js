/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
    typescript: {
        ignoreBuildErrors: true
    },
    webpack: (config) => {
        config.module.rules.unshift({
            test: /pdf\.worker\.(min\.)?js/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[contenthash].[ext]",
                        publicPath: "_next/static/worker",
                        outputPath: "static/worker"
                    }
                }
            ]
        });
        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader'
        })
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`
            }
        ]
    }
}

module.exports = nextConfig
