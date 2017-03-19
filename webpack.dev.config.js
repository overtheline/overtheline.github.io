var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
