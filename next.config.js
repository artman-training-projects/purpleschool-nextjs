module.exports = {
  images: {
    domains: ['courses-top.ru'],
  },
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      test: /\.svg$/,
      options: {
        titleProp: true,
        svgo: true,
        scgoConfig: {
          plugins: [{ removeViewBox: false }],
        },
      },
    });

    return config;
  },
};
