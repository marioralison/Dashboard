const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  mode: 'production',
  target: 'electron-renderer',
  entry: './src/renderer.js',
  module: {
    rules,
  },
  output: {
    path: path.resolve(__dirname, '.webpack/renderer'),
    filename: 'renderer.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
