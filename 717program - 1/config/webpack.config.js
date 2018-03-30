// dev: 需要起服务，不用进行压缩
// build: 不用起服务，要进行压缩，代码分离
const dir = process.cwd(); // 获取当前程序运行的目录
const baseConfig = {
  // commonjs规范
  entry: {
    // 入口文件：可以是字符串、数组、对象
    bundle: dir + "/src/main.js"
  },
  output: {
    path: dir + "/dist", // path 字段指打包出的目录
    filename: "js/[name].js", // filename 字段指打包出的名字
    publicPath: "/" // publicPath 打包上线地址 例：'http://kuo.91ikk.cn'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel"],
        exclude: /node_modules/ // 排除node_modules
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style",
          "css",
          "sass",
          "postcss"
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|jpg|png|gif|jpeg)$/,
        use: ["file"]
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ["-loader"] // 省略loader后缀
  },
  plugins: [],
  resolve: {
    extensions: [".js", ".jsx"] // 省略后缀名 默认找到js/jsx
  }
};

module.exports = baseConfig

// let config = {}
// if (process.env.NODE_ENV === "development") {
//   // console.log('开发环境')
//   config = 
// }

// if (process.env.NODE_ENV === "production") {
//   // console.log('线上环境、生产环境')
//   // 往plugins中追加插件
//   baseConfig.plugins.push(new UglifyJsPlugin());
//   config = {
//     ...baseConfig
//   };
// }

// module.exports = config;
// // 不被babel编译，不支持es6
