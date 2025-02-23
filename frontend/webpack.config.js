const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    port: 3003,
    host: '0.0.0.0',  // Allow connections from all interfaces
    allowedHosts: 'all',  // Allow all hosts to connect
    webSocketServer: false,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
    }
  },
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public',
          to: '',
          globOptions: {
            ignore: ['**/service-worker.js'] // Don't copy service worker with other files
          }
        },
        // { 
        //   from: 'public/service-worker.js',
        //   to: 'service-worker.js'
        // }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || ''),
    }),
  ],
  watchOptions: { 
    ignored: /node_modules/,
  },
};
