import pcaData from './area-data'
import { d2CrudPlus } from 'd2-crud-plus'
const types = {
  'area-selector': {
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true } } } },
    component: { name: 'cascade-format', props: { } },
    dict: { data: pcaData, label: 'name', value: 'code' }
  },
  'area-multi-selector': {
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true, props: { multiple: true }, 'collapse-tags': true } } } },
    component: { name: 'cascade-format', props: { multiple: true } },
    dict: { data: pcaData, label: 'name', value: 'code' }
  },
  'area-tree-selector': {
    form: { component: { name: 'd2p-tree-selector', props: { } } },
    component: { name: 'values-format', props: {} },
    dict: { data: pcaData, label: 'name', value: 'code', isTree: true }
  }
}

function install (Vue) {
  d2CrudPlus.util.columnResolve.addTypes(types)
}

export default {
  install
}
