const analyze = process.env.BUILD_ANALYZE

const plugins = []
if (analyze) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  css: { extract: false },
  configureWebpack: {
    plugins: plugins,
    externals: {
      'vue': 'Vue',
      'element-ui': 'ElementUI'
    }
  }
}
