const baseConfig = require('./webpack.config')
// console.log('线上环境、生产环境')
const webpack = require("webpack"); // 引入webpack
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin; // 打包js
const DefinePlugin = webpack.DefinePlugin;

// 往plugins中追加插件
baseConfig.plugins.push(
  new UglifyJsPlugin(),
  new DefinePlugin({
    "process.env.NODE_ENV": '"production"'
  })
);

module.exports = {
  ...baseConfig,
}