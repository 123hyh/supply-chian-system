/*
 * @Author: your name
 * @Date: 2020-07-07 16:37:02
 * @lastTime: 2020-07-17 09:05:35
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\scripts\production.js
 */

const Webpack = require('webpack');
const prodOptions = require('../webpack/webpack.prod');
const compile = Webpack(prodOptions);
compile.run((err, stats) => {
  if (err || stats.compilation.errors.length) {
    console.log('错误信息: ', err,stats.compilation.errors);
  }else{
  }
});
