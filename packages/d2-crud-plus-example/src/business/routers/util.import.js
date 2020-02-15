// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const env = process.env.NODE_ENV
let _import
function removeSlash (file) {
  if (file.indexOf('/') === 0) {
    file = file.substring(1)
  }
  return file
}

if (env === 'development') {
  _import = file => {
    file = removeSlash(file)
    return require('@/business/modules/' + file).default
  }
} else {
  _import = module.exports = file => () => {
    file = removeSlash(file)
    return import('@/business/modules/' + file)
  }
}
module.exports = _import
