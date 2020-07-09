/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:19
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 09:34:18
 * @message:
 * @FilePath: \supply-chain-cli\webpack\webpack.prod.js
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
    filename: `[name].[chunkhash].js`,
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
      filename: '[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
  ],
});
