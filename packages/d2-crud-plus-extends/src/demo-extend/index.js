import { d2CrudPlus } from 'd2-crud-plus'
import types from './types'

function install (Vue, options) {
  Vue.component('d2p-form-input', () => import('./lib/d2p-form-input'))
  Vue.component('d2p-row-format', () => import('./lib/d2p-row-format'))
  if (d2CrudPlus != null) {
    // 注册字段类型`demo-extend`
    d2CrudPlus.util.columnResolve.addTypes(types)
  }
}

// 导出install， 通过`vue.use(D2pDemoExtend)`安装后 ，`demo-extend` 就可以在`crud.js`中使用了
export default {
  install
}
