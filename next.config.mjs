import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
    dest: 'public',
    register: true,
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    fallbacks: {
        //image: "/static/images/fallback.png",
        document: '/offline',
        // font: '/static/font/fallback.woff2',
        // audio: ...,
        // video: ...,
    },
    workboxOptions: {
        disableDevLogs: true,
    },
    // cacheOnFrontEndNav: true,
})

export default withPWA({
    // next.js config
    reactStrictMode: false,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: process.env.NEXT_PUBLIC_HOSTNAME,
                port: process.env.NEXT_PUBLIC_PORT,
            },
        ],
    },
    async headers() {
        return [
            {
                // DOES NOT WORK
                // value: process.env.ALLOWED_ORIGIN,
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*', // Consider setting this to a specific domain for better security
                    },
                    // {
                    //     key: 'Content-Security-Policy',
                    //     // Ensure protocol matches your deployment (http:// for development, https:// for production)
                    //     value: "frame-ancestors * 'self' http://192.168.228.4:1337; frame-src * 'self' http://192.168.228.4:1337 http://localhost",
                    // },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ]
    },
})
