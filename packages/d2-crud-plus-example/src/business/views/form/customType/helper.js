export default {
  code: `
import { d2CrudPlus } from 'd2-crud-plus'
import Vue from 'vue'
Vue.use(d2CrudPlus)
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

//然后在crudOptions中配置column中配置 type: 'time2'即可使用


export const crudOptions = {
  columns: [
    {
      title: '字段类型',
      key: 'date',
      align: 'left',
      type: 'time2',
      search: {}
    }
  ]
}
`
}
