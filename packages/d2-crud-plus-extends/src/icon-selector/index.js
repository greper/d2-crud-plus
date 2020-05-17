import { d2CrudPlus } from 'd2-crud-plus'
import types from './types'

function install (Vue, options) {
  Vue.component('d2p-icon-select', () => import('./lib/d2-icon-select'))
  Vue.component('d2p-icon', () => import('./lib/d2p-icon'))
  if (d2CrudPlus != null) {
    d2CrudPlus.util.columnResolve.addTypes(types)
    console.log('icon-selector installed', d2CrudPlus.util.columnResolve.getTypes())
  }
}

export default {
  install
}
