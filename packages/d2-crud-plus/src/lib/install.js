import components from './components'

import crud from './mixins/crud'
import input from './mixins/input'
import inputBase from './mixins/input-base'
import dict from './utils/util.dicts'
import height from './utils/util.height'
import columnResolve from './utils/util.column.resolve'
import lodash from './utils/util.lodash'
import commonOptions from './utils/util.options.common'

const util = {
  dict,
  height,
  columnResolve,
  lodash,
  commonOptions
}

const install = (Vue, options) => {
  for (let key in components) {
    Vue.component(components[key].name, components[key])
  }
  console.log('d2-crud-plus install options:', options)
  if (options != null) {
    if (options.getRemoteDictFunc != null) {
      util.dict.getRemoteDictFunc = options.getRemoteDictFunc
    }
    if (options.commonOption != null) {
      if (options.commonOption instanceof Function) {
        commonOptions.create = options.commonOption
      } else {
        console.error('defaultOptions 必须传入一个方法，类似data(){ return {} }')
      }
    }
  }
}
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }
export default { install,
  util,
  crud,
  input,
  inputBase
}
