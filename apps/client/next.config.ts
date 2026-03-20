import type { NextConfig } from "next";
import path from 'path';

const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../..')
  }
};

module.exports = withNextIntl(nextConfig);
