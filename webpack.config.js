var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

var common = {
  entry: PATHS.app,
  // As webpack-dev-server runs in-memory,
  // we can drop `output` for now.
  /*output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },*/
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      // Enables History API routes
      historyAPIFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output
      stats: 'errors-only',

      // Parse host and port from env to make it easier to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}