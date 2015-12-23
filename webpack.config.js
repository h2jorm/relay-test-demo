const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-relay',
      'lodash',
      'history',
    ],
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: ['./scripts/babelRelayPlugin'],
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {warning: false}
    })
  )
} else {
  module.exports.devtool = '#source-map'
}
