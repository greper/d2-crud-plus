import d2Crud from './d2-crud.vue'

import base from './mixin/base'
import handleRow from './mixin/handleRow'
import data from './mixin/data'
import edit from './mixin/edit'
import add from './mixin/add'
import remove from './mixin/remove'
import dialog from './mixin/dialog'
import pagination from './mixin/pagination'
import exposeMethods from './mixin/exposeMethods.js'
import utils from './mixin/utils'
import renderComponent from './components/renderComponent.vue'
import renderCustomComponent from './components/renderCustomComponent.vue'

const install = (Vue, options) => {
  if (options) {
    Vue.prototype.$d2CrudSize = options.size ? options.size : null
  } else {
    Vue.prototype.$d2CrudSize = null
  }
  Vue.component('d2Crud', d2Crud)

  Vue.component(renderComponent.name, renderComponent)

  Vue.component(renderCustomComponent.name, renderCustomComponent)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const components = {
  base,
  handleRow,
  data,
  edit,
  add,
  remove,
  dialog,
  pagination,
  exposeMethods,
  utils,
  renderComponent,
  renderCustomComponent,
  d2Crud
}

export default { install,
  ...components }
