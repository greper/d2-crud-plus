const webpack = require('webpack')
const LimitChunkCountPlugin = new webpack.optimize.LimitChunkCountPlugin({
  maxChunks: 1,
  minChunkSize: 1000
})
const plugins = []
plugins.push(LimitChunkCountPlugin)
module.exports = {
  css: { extract: false },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ElementUI',
      lodash: 'lodash'
    },
    plugins: plugins
  }
}
