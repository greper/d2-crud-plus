export default {
  select: {
    search: { disabled: true, component: { props: { clearable: true } } },
    form: { component: { name: 'dict-select', props: { elProps: { disabled: false, readonly: false } } } },
    component: { name: 'values-format', props: {} }
  },
  radio: {
    search: { disabled: true, component: { name: 'dict-select', props: { clearable: true } } },
    form: { component: { name: 'dict-radio', props: { elProps: { disabled: false, readonly: false } } } },
    component: { name: 'values-format', props: {} }
  },
  checkbox: {
    search: { disabled: true, component: { name: 'dict-select', props: { clearable: true, multiple: true } } },
    form: { component: { name: 'dict-checkbox', props: { elProps: { disabled: false, readonly: false } } } },
    component: { name: 'values-format', props: {} }
  },
  'dict-switch': {
    search: { disabled: true, component: { name: 'dict-switch', props: { clearable: true, multiple: true } } },
    form: { component: { name: 'dict-switch', props: { elProps: { disabled: false, readonly: false } } } },
    component: { name: 'values-format', props: { elProps: { disabled: false, readonly: true } } }
  }
}
