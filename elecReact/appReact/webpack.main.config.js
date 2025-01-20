const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js',
    preload: './src/preload.js'
  },
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'electron-main',
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.json', '.node'],
    fallback: {
      fs: false,
      child_process: false,
      path: false,
    },
  },
  externals: {
    sqlite3: "commonjs sqlite3",
    argon2: "commonjs argon2",
    electron: 'commonjs electron',
              'electron-squirrel-startup': 'commonjs electron-squirrel-startup',
  },
};
