/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Required for static export
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Fixed basePath and assetPrefix for GitHub Pages
  basePath: '/git-github-guide',
  assetPrefix: '/git-github-guide/',
  distDir: 'dist',
}

// Try to import user config
let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
  
  // Merge user config with next config
  if (userConfig) {
    for (const key in userConfig) {
      if (
        typeof nextConfig[key] === 'object' &&
        !Array.isArray(nextConfig[key])
      ) {
        nextConfig[key] = {
          ...nextConfig[key],
          ...userConfig[key],
        }
      } else {
        nextConfig[key] = userConfig[key]
      }
    }
  }
} catch (e) {
  // ignore error
}

export default nextConfig
