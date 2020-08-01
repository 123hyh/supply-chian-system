/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:26:35
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-14 16:38:06
 * @message:
 * @FilePath: \supply-chain-system\webpack\webpack.dev.js
 */

const baseConf = require('./webpack.base');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConf, {
  entry: {
    docs: path.resolve(__dirname, '../docs/main.js')
  },
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
    overlay: {
      warnings: false,
      errors: true,
    },
    publicPath: '/',
    watchOptions: {
      poll: false,
    },
  },
  devtool: 'source-map',
  resolve:{
    alias:{
      '@docs': path.resolve(process.cwd(),'docs/src') 
    }
  },
  plugins: [

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public/index.html'),
      filename: 'docs.html',
      chunks:['docs']
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`您的应用程序正在这里运行:  http://localhost:${8090}\n`],
      },
    }),
  ],
});
