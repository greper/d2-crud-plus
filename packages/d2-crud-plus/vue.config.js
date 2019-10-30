module.exports = {
  css: { extract: false },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'element-ui': 'ElementUI',
      'lodash': 'lodash'
    }
  }
}
