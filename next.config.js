/** @type {import('next').NextConfig} */
const nextConfig = {
    "compilerOptions": {
    "target": "es2015",
    "downlevelIteration": true
  },
    images: {
        domains: ['example.com'], // Thay bằng domain thật của ảnh
      },
};

module.exports = nextConfig;
