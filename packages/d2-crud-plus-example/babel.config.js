module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/env', {
      'targets': {
        'browsers': ['last 2 versions', 'ie >= 11']
      },
      'useBuiltIns': 'usage'
    }]
  ],
  // 允许两种编码引入方式共存,也就是 common 规范与 es6 规范的共存处理
  sourceType: 'unambiguous'
}
