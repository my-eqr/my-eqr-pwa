import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // cacheOnFrontEndNav: true,
});

export default withPWA({
  // next.js config
  reactStrictMode: false,
  swcMinify: false,
});
