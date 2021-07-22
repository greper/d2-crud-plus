import d2Crud from './d2-crud.vue'
import drag from './directives/el-drag-dialog/drag'
const install = (Vue, options) => {
  let name = 'd2Crud'
  if (options && options.name != null) {
    name = options.name
  }
  Vue.component(name, d2Crud)
  Vue.directive('d2p-drag-dialog', drag)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(d2Crud, { install })
