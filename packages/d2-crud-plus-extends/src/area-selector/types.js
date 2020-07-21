import pcaData from './area-data'
export default {
  'area-selector': {
    search: { disabled: true, component: { value: []/* 修复重置表单时返回[null]的bug */, props: { elProps: { clearable: true } } } },
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true } } } },
    component: { name: 'cascade-format', props: { } },
    dict: { url: pcaData, label: 'name', value: 'code' }
  },
  'area-multi-selector': {
    search: { disabled: true, component: { value: []/* 修复重置表单时返回[null]的bug */, props: { elProps: { clearable: true } } } },
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true, props: { multiple: true }, 'collapse-tags': true } } } },
    component: { name: 'cascade-format', props: { multiple: true } },
    dict: { url: pcaData, label: 'name', value: 'code' }
  },
  'area-tree-selector': {
    form: { component: { name: 'd2p-tree-selector', props: { } } },
    component: { name: 'values-format', props: {} },
    dict: { url: pcaData, label: 'name', value: 'code', isTree: true }
  }
}
