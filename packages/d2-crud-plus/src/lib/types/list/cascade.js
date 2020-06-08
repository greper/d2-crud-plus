export default {
  cascader: {
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true, disabled: false } } } },
    component: { name: 'cascade-format', props: { multiple: false } }
  },
  'cascader-multi': {
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true, disabled: false, props: { multiple: true }, 'collapse-tags': true } } } },
    component: { name: 'cascade-format', props: { multiple: true } }
  }
}
