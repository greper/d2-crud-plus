import components from './components'

import crud from './mixins/crud'
import dict from './utils/util.dicts'
import height from './utils/util.height'
import columnResolve from './utils/util.column.resolve'

const util = {
  dict,
  height,
  columnResolve
}

const install = (Vue, options) => {
  for (let key in components) {
    Vue.component(components[key].name, components[key])
  }

  if (options.getRemoteDictFunc != null) {
    util.dict.getRemoteDictFunc = options.getRemoteDictFunc
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default { install,
  util,
  crud
}
