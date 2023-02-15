const path = require('path');
const env = require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/javascript/index.js',
  },
  mode: env.parsed.WP_ENV,
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }
    ),
  ],
  output: {
    filename: 'javascript/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      },
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  resolve: {
    fallback: {
      "zlib": require.resolve('browserify-zlib'),
      "assert": require.resolve('assert/'),
      "buffer": require.resolve('buffer/'),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve('util/'),
      "http": require.resolve('stream-http'),
      "https": require.resolve('https-browserify'),
      "fs": require.resolve('fs-web'),
      "url": require.resolve('URL'),
    }
  }
};