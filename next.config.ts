import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: {
      exclude: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['error', 'warn', 'log', 'debug']
    }
  }
}

export default nextConfig
