import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable SWC minification for optimal performance
  swcMinify: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Compression
  compress: true,
  
  // Bundle analysis (optional - enable for debugging)
  // bundlePagesRouterDependencies: true,
  
  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Temporarily disabled - missing critters dependency
    gzipSize: true,
    optimizePackageImports: ['framer-motion', '@heroicons/react', 'lucide-react'],
  },
  
  // Bundle optimization for reduced main-thread work
  webpack: (config, { dev, isServer }) => {
    // Aggressive optimizations for production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            // Isolate framer-motion as it's the heaviest
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 40,
              chunks: 'all',
              reuseExistingChunk: true,
            },
            // React and React-DOM together
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 30,
              chunks: 'all',
              reuseExistingChunk: true,
            },
            // Icons libraries
            icons: {
              name: 'icons',
              test: /[\\/]node_modules[\\/](@heroicons|lucide-react|react-icons)[\\/]/,
              priority: 25,
              chunks: 'all',
              reuseExistingChunk: true,
            },
            // Other vendors
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'all',
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  
  // Headers optimized for bfcache compatibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate' // bfcache-friendly
          }
        ]
      },
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*)\\.(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600' // Optimal for bfcache
          }
        ]
      }
    ]
  },
};

export default withBundleAnalyzer(nextConfig);
