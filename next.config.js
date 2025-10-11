/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com', 'picsum.photos', 'bizweb.dktcdn.net'],
    formats: ['image/webp', 'image/avif'],
  },
  // Skip static generation for pages using localStorage/Context
  // This prevents "useCart must be used within CartProvider" errors
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  },
  // Performance optimizations
  swcMinify: true,
  reactStrictMode: true,
  // IMPORTANT: Do NOT use static export - it breaks Context/localStorage
  // output: 'export', // ❌ Disabled - causes prerender errors
  // trailingSlash: true,
}

module.exports = nextConfig
