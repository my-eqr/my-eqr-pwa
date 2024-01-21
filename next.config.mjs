import nextPWA from 'next-pwa'

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

export default withPWA({
  // next.js config
  reactStrictMode: false,
  swcMinify: false,
})