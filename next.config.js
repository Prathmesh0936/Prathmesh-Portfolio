const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude react-fast-marquee from server bundle to prevent SSR issues
      config.externals = config.externals || [];
      config.externals.push('react-fast-marquee');
    }
    return config;
  },
}