var webpack = require('webpack')
var path = require('path')
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'app'),
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /(\.scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  }
}
