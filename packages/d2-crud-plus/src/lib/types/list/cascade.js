export default {
  cascader: {
    search: { disabled: true, component: { props: { elProps: { clearable: true } } } },
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true, disabled: false } } } },
    component: { name: 'cascade-format', props: { multiple: false } }
  },
  'cascader-multi': {
    search: { disabled: true, component: { props: { elProps: { clearable: true } } } },
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true, disabled: false, props: { multiple: true }, collapseTags: true } } } },
    component: { name: 'cascade-format', props: { multiple: false } }
  }
}
