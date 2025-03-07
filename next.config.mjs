let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

// Get repository name from package.json for GitHub Pages path
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { name } = require('./package.json');

// GitHub Pages deployment - set basePath and assetPrefix for repository name
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repositoryName = name || 'git-github-guide';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  basePath: isGithubActions ? `/${repositoryName}` : '',
  assetPrefix: isGithubActions ? `/${repositoryName}/` : '',
  distDir: 'dist',
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

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

export default nextConfig
