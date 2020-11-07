const webpack = require('webpack')
// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

const LimitChunkCountPlugin = new webpack.optimize.LimitChunkCountPlugin({
  maxChunks: 1,
  minChunkSize: 1000
})
const plugins = []
plugins.push(LimitChunkCountPlugin)
let externals = {
  vue: 'Vue',
  'element-ui': 'ElementUI',
  lodash: 'lodash'
}
if (process.env.VUE_APP_RUN_DEMO) {
  externals = {}
}
module.exports = {
  css: { extract: false },
  configureWebpack: {
    externals: externals,
    plugins: plugins
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    config.resolve.alias
      .set('@log', resolve('src/lib/utils/util.log.js'))
  }
}
