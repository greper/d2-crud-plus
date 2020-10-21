import components from './components'

import crud from './mixins/crud'
import input from './mixins/input'
import inputBase from './mixins/input-base'
import inputDict from './mixins/input-dict'

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
  for (const key in components) {
    Vue.component(components[key].name, components[key])
  }
  if (options != null) {
    if (!(options.starTip === false)) {
      console.log('演示地址  http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/')
      console.log('文档  http://greper.gitee.io/d2-crud-plus/')
      console.log('Gitee   https://gitee.com/greper/d2-crud-plus')
      console.log('GitHub  https://github.com/greper/d2-crud-plus')
      console.log('请不要吝啬您的star，谢谢！')
      console.log('您可以通过 vue.use(d2CrudPlus,{starTip:false}) 来关闭以上消息')
    }

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
    console.log('d2-crud-plus installed:', options)
  }
}
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }
export default {
  install,
  util,
  crud,
  input,
  inputBase,
  inputDict
}
