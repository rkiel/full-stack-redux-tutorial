module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    ]
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
    port: 8080
  }
};
