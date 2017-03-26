
module.exports = {
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
  resolve: {
    extensions: ['.js', 'jsx', '.json'],
  },
};
