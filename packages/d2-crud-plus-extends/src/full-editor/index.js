import { d2CrudPlus } from '../utils/d2-crud-plus'
import types from './types'
import defaultConfig from './lib/d2-ueditor/utils/config'
function install (Vue, options) {
  Vue.component('d2p-quill', () => import('./lib/d2-quill'))
  Vue.component('d2p-ueditor', () => import('./lib/d2-ueditor'))
  // 配置type
  if (d2CrudPlus != null) {
    // 设置默认uploader
    d2CrudPlus.util.columnResolve.addTypes(types)
  }
  if (options && options.ueditor) {
    Object.assign(defaultConfig, options.ueditor)
  }
}

export default {
  install
}
