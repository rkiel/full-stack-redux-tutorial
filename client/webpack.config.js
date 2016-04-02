var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://192.168.33.60:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    host: '192.168.33.60',
    port: 8080,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
