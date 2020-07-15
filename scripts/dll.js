/*
 * @Author: huangyuhui
 * @since: 2020-07-14 17:41:37
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-14 17:44:51
 * @message: 构建 dll
 * @FilePath: \supply-chain-system\scripts\dll.js
 */ 
const path = require("path");
const webpack = require("webpack");
const webpackConfig = {
  entry: { 
    vendor: ["vue", "vue-router", "vuex"]
  },
  mode: "production",
  output: {
    path: path.join(process.cwd(), "dll"),
    filename: "[name].dll.js",
    library: "[name]_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(process.cwd(), "dll", "[name]-manifest.json"),
      name: "[name]_[hash]"
    })
  ]
};
webpack(webpackConfig).run();