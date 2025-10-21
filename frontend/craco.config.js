module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // Add html-loader for HTML files
      webpackConfig.module.rules.push({
        test: /\.html$/,
        use: ['html-loader'],
      });

      // Add fallback for three-dev modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        'three-dev': false,
      };

      return webpackConfig;
    },
  },
};
