const rules = require('./webpack.rules');
const path = require('path')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  mode: 'production',
  entry: './src/renderer.js',
  output: {
    path: path.resolve(__dirname, '.webpack/renderer'),
    filename: '[name].js',
    publicPath: '/',
  },
  target: 'electron-renderer',
  module: {
    rules,
  },
  resolve: {
    fallback: {
      fs: false,
      child_process: false,
      path: false,
    },
  },
  performance: {
    hints: false,
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
