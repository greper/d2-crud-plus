import { d2CrudPlus } from 'd2-crud-plus'
const types = {
  'icon-selector': {
    form: { component: { name: 'd2-icon-select', props: { 'user-input': true } } },
    component: { name: 'd2p-icon' },
    align: 'center'
  }
}

function install (Vue, options) {
  Vue.component('d2-icon-select', () => import('./d2-icon-select'))
  Vue.component('d2p-icon', () => import('./d2p-icon'))
  if (d2CrudPlus != null) {
    d2CrudPlus.util.columnResolve.addTypes(types)
    console.log('icon-selector installed', d2CrudPlus.util.columnResolve.getTypes())
  }
}

export default {
  install
}
