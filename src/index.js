import LabelTag from './components/tag/LabelTag'

import DictSelect from './components/form/DictSelect'

import DateFormat from './components/format/DateFormat'
import ValuesFormat from './components/format/ValuesFormat'

import CrudSearch from './components/search/index'
import CrudFooter from './components/footer/index'

import crud from './mixins/crud'
import dict from './utils/util.dicts'
import height from './utils/util.height'
import columnResolve from './utils/util.column.resolve'

const util = {
  dict,
  height,
  columnResolve
}

const components = {
  LabelTag,
  DictSelect,
  DateFormat,
  ValuesFormat,
  CrudSearch,
  CrudFooter
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
// 注意 有些组件使用异步加载会有影响
export default { install,
  ...components,
  util,
  crud
}
