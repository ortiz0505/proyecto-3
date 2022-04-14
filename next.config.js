/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s.gravatar.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig