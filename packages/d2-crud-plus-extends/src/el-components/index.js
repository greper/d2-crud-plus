const types = {
  'number': {
    form: { component: { name: 'el-input-number', props: { } } },
    align: 'center'
  },
  'switch': {
    form: { component: { name: 'el-switch', props: { } } },
    align: 'center'
  },
  'slider': {
    form: { component: { name: 'el-slider', props: { } } },
    align: 'center'
  },
  'rate': {
    form: { component: { name: 'el-rate', props: { } } },
    align: 'center'
  },
  'color-picker': {
    form: { component: { name: 'el-color-picker', props: { } } },
    align: 'center'
  },
  'transfer': {
    form: { component: { name: 'el-transfer', props: { } } },
    align: 'center'
  }
}

function install (Vue, options) {
  if (options != null) {
    // 配置type
    if (options.d2CrudPlus != null) {
      options.d2CrudPlus.util.columnResolve.addTypes(types)
    }
  }
}

export default {
  install
}
