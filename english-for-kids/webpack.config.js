var path = require('path');

module.exports = {
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["eslint-loader"]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: __dirname,
  }
};