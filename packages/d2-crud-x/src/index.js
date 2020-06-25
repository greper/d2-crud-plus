import d2Crud from './d2-crud.vue'
const install = (Vue, options) => {
  let name = 'd2Crud'
  if (options && options.name != null) {
    name = options.name
  }
  Vue.component(name, d2Crud)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(d2Crud, { install })
