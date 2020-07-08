/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:36:58
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 11:47:33
 * @message: 
 * @FilePath: \supply-chain-cli\scripts\development.js
 */
const Webpack = require('webpack')
const devOptions = require('../webpack/webpack.dev')

module.exports = devOptions

/* const WebpackDevServer = require('webpack-dev-server')
const compile = Webpack(devOptions)

const developmentServer = new WebpackDevServer(compile)

developmentServer.listen(8090, (e) => {
  console.log(`程序运行在：http://localhost:3050`)
}) */
