const path = require('path')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',

  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.json', '.node'],
  },
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: 'main_window.js',
    publicPath : "./"
  },
  externals: {
    sqlite3: "commonjs sqlite3"
  },
};
