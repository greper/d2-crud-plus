export default {
  select: {
    search: { disabled: true, component: { props: { clearable: true } } },
    form: { component: { name: 'dict-select', props: {} } },
    component: { name: 'values-format', props: {} }
  },
  radio: {
    search: { disabled: true, component: { name: 'dict-select', props: { clearable: true } } },
    form: { component: { name: 'dict-radio', props: {} } },
    component: { name: 'values-format', props: {} }
  },
  checkbox: {
    search: { disabled: true, component: { name: 'dict-select', props: { clearable: true, multiple: true } } },
    form: { component: { name: 'dict-checkbox', props: {} } },
    component: { name: 'values-format', props: {} }
  }
}
