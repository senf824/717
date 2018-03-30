const baseConfig = require('./webpack.config')
// console.log('开发环境')
const webpack = require("webpack"); // 引入webpack
const DefinePlugin = webpack.DefinePlugin;
// 往plugins中追加插件
baseConfig.plugins.push(new DefinePlugin({
  "process.env.NODE_ENV" : '"development"'
}));
module.exports = {
  ...baseConfig,
  devServer: {
    // contentBase: './dist/',
    historyApiFallback: true,
    inline: true,
    open: true,
    port: 3000,
    noInfo: true  // 不显示处理信息
  },
  devtool: "eval-source-map"
};