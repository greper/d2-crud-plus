import { d2CrudPlus } from 'd2-crud-plus'
const types = {
  'tree-selector': {
    form: { component: { name: 'd2p-tree-selector', props: { } } },
    component: { name: 'values-format', props: {} }
  }
}

function install (Vue) {
  Vue.component('d2p-tree-selector', () => import('./lib/tree-selector'))
  d2CrudPlus.util.columnResolve.addTypes(types)
}

export default {
  install
}
