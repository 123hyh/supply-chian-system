/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:26:35
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 11:43:20
 * @message:
 * @FilePath: \supply-chain-cli\webpack\webpack.dev.js
 */

const baseConf = require('./webpack.base');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseConf, {
  mode: 'development',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: `[name].js`,
    publicPath: '/',
  },
  devServer: {
    hot: true,
    quiet: true,
    clientLogLevel: 'warning',
    progress: true,
    compress: true,
    host: '0.0.0.0',
    port: 8090,
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/',
    watchOptions: {
      poll: false,
    },
  },
  devtool: 'source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`您的应用程序正在这里运行:  http://localhost:${8090}\n`],
      },
    }),
  ],
});
