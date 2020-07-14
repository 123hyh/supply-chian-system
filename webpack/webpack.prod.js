/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:19
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-14 11:06:25
 * @message:
 * @FilePath: \supply-chain-system\webpack\webpack.prod.js
 */

const baseConf = require('./webpack.base');
const { merge } = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const path = require('path')
const {
  development: isDevelopment,
  local: isLocal,
  production: isProduction,
} = require('yargs').argv;
module.exports = merge(baseConf, {
  mode: 'production',
  devtool: 'nosources-source-map',
  output: {
    filename: `js/[name].[chunkhash].js`,
    path: path.join(process.cwd(), 'dist'),
    chunkFilename: `js/[name].[chunkhash].js`,
    publicPath: isProduction && isLocal ? './' : '/',
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 8192,
      test: /\.(js|css|html|svg)$/,
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
      chunkFilename: 'style/[name].[contenthash].css',
    }),
  ],
});
