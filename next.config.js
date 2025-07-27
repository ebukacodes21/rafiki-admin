/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['sharp', 'onnxruntime-node'],
};

module.exports = nextConfig;
