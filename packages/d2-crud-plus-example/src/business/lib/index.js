import Vue from 'vue'
import d2Crud from 'd2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pFileUploader } from 'd2-crud-plus-extends'
import request from '@/plugin/axios'
// 引入d2Crud
Vue.use(d2Crud)
// 引入d2CrudPlus
Vue.use(d2CrudPlus, { getRemoteDictFunc (url) {
  return request({
    url: url,
    method: 'get'
  }).then(ret => {
    return ret.data
  })
}
})
// 安装扩展插件
Vue.use(D2pFileUploader, { d2CrudPlus,
  getUploadUrl (opts) {
    return request({
      url: '/api/basic/attachment/uploadUrl',
      method: 'get',
      params: {
        type: opts.fileType,
        fileName: opts.fileName,
        appendRandom: true,
        keepOriginalName: true
      }
    }).then(ret => {
      return ret.data
    })
  }
})
//  自定义字段类型示例
d2CrudPlus.util.columnResolve.addTypes({
  'time2': {
    form: { component: { name: 'el-date-picker', props: { type: 'datetime' } } }, // 编辑时支持日期时间
    search: { component: { props: { type: 'date' } } }, // 搜索时只支持日期
    formatter (row, column, value, index) {
      return value + '-->我是自定义字段类型：time2'
    },
    _handle (column) {
      //  此方法主要将column中某些依赖的用户配置的属性放到默认配置中，比如数据字典的配置
      if (column.dict != null) {
        this.form.component.props.dict = column.dict
        this.component.props.dict = column.dict
      }
    }
  }
})
