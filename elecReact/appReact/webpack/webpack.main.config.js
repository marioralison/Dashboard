const path = require('path');
const webpack = require('webpack'); // Ajout de cette ligne pour importer Webpack

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  mode: 'production',
  target: 'electron-main',
  entry: {
    main: './src/main.js',
    preload: './src/preload.js', // Assure-toi que le fichier preload.js existe
  },

  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.json', '.node'],
  },
  output: {
    path: path.resolve(__dirname, '.webpack/main.js'),
    filename: '[name].js',
    publicPath: './',
  },
  externals: {
    sqlite3: 'commonjs sqlite3',
    argon2: 'commonjs argon2',
  },
  node: {
    __dirname: false, // Sinon, Webpack pourrait ne pas pouvoir résoudre __dirname
  },
  plugins: [
    new webpack.DefinePlugin({
      MAIN_WINDOW_WEBPACK_ENTRY: JSON.stringify('../src/index.html'),
      MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: JSON.stringify(path.resolve(__dirname, '../.webpack/preload.js')),
    }),
  ],
};
