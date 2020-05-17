import { d2CrudPlus } from 'd2-crud-plus'
import types from './types'

function install (Vue, options) {
  Vue.component('d2p-quill', () => import('./lib/d2-quill'))
  // 配置type
  if (d2CrudPlus != null) {
    // 设置默认uploader
    d2CrudPlus.util.columnResolve.addTypes(types)
  }
}

export default {
  install
}
