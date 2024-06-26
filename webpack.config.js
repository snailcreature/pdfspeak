const path = require('path');
const env = require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let hash = (new Date()).getTime();

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
      filename: "css/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        './src/manifest.json',
        './src/sw.js',
      ],
    }),
  ],
  output: {
    filename: 'javascript/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
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
      },
      {
        test: /\.worker\.js$/,
        type: 'javascript/auto',
        loader: 'worker-loader',
        enforce: 'post',
        options: {
          filename: 'javascript/[name].js',
        }
      },
      {
        test: /\.PNG$/,
        type: 'asset/resource',
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      }
    ],
  },
  resolve: {
    fallback: {
      // "zlib": require.resolve('browserify-zlib'),
      // "assert": require.resolve('assert/'),
      // "buffer": require.resolve('buffer/'),
      // "stream": require.resolve("stream-browserify"),
      // "util": require.resolve('util/'),
      // "http": require.resolve('stream-http'),
      // "https": require.resolve('https-browserify'),
      "fs": require.resolve('fs-web'),
      // "url": require.resolve('URL'),
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    headers: {
      //"Content-Type": "application/javascript",
    }
  }
};