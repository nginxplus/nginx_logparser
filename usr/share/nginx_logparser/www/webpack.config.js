const resolve = require('path').resolve;
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');

const pathTo = {
  entry: resolve(__dirname, 'src/entry.js'),
  bundleDir: resolve(__dirname, 'bundle/js/'),
};

module.exports = {
  entry: pathTo.entry,
  output: {
    path: pathTo.bundleDir,
    filename: 'index.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          resolve(__dirname, 'src/'),
        ],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new AureliaWebpackPlugin()],
};
