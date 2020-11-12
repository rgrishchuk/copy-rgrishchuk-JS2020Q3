var path = require('path');

module.exports = {
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: __dirname,
  },
};
