import { d2CrudPlus } from '../utils/d2-crud-plus'
import types from './types'
import defaultUeditorConfig from './lib/d2-ueditor/utils/config'
import defaultWangConfig from './lib/d2-wang-editor/utils/config'
function install (Vue, options) {
  Vue.component('d2p-quill', () => import('./lib/d2-quill'))
  Vue.component('d2p-ueditor', () => import('./lib/d2-ueditor'))
  Vue.component('d2p-wang-editor', () => import('./lib/d2-wang-editor'))
  // 配置type
  if (d2CrudPlus != null) {
    // 设置默认uploader
    d2CrudPlus.util.columnResolve.addTypes(types)
  }
  if (options && options.ueditor) {
    Object.assign(defaultUeditorConfig, options.ueditor)
  }
  if (options && options.wangEditor) {
    Object.assign(defaultWangConfig, options.wangEditor)
  }
}

export default {
  install
}
