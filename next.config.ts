import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  assetPrefix: '/hxh',
  images: { unoptimized: true },
};

export default config;
