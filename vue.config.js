module.exports = {
  devServer: {
    // 项目运行时候的端口号
    port: 4000
  },
  configureWebpack: {
    externals: {
      BMap: 'BMap',
      BMapLib: 'BMapLib'
    }
  }
}