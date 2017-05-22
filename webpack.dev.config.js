var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.jsx$/,
        exclude: /node-modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: 'Here\'s some bullshit...',
      alwaysNotify: true,
    })
  ],
  resolve: {
    extensions: ['.js', 'jsx', '.json'],
  },
};
