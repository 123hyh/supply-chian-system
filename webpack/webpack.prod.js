/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:19
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-23 10:54:55
 * @message:
 * @FilePath: \supply-chain-system\webpack\webpack.prod.js
 */

const baseConf = require('./webpack.base');
const { merge } = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const path = require('path');
const webpack = require('webpack');


const {
  development: isDevelopment,
  local: isLocal,
  production: isProduction,
  volume: isShowVolume
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

    /* 添加 dll 插件 */
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(path.resolve(process.cwd(), 'dll/vendor-manifest.json'))
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(process.cwd(), "dll/*.dll.js")
    }),
    /* 打包进度条 */
    new ProgressBarPlugin(),
    /* 体积可视化 */
    isShowVolume && new BundleAnalyzerPlugin()
  ].filter(Boolean),
});
