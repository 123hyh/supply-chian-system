/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:36:58
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-14 16:46:40
 * @message: 
 * @FilePath: \supply-chain-system\scripts\development.js
 */
const Webpack = require('webpack')
const devOptions = require('../webpack/webpack.dev')


const WebpackDevServer = require('webpack-dev-server')

const {devServer,...option} = devOptions

const compile = Webpack(option)

const developmentServer = new WebpackDevServer(compile, devServer)

developmentServer.listen(8090, 'localhost', (e) => {
  if (e) {
    console.log(e)
  }
})
