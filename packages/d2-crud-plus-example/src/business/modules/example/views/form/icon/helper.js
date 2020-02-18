export default {
  init: `  import Vue from 'vue'
  import d2Crud from 'd2-crud-x'
  import { d2CrudPlus } from 'd2-crud-plus'
  import { D2pIconSelector } from 'd2p-extends'
  // 安装扩展插件
  Vue.use(D2pIconSelector)
  `,
  crud: `export const crudOptions = {
  columns: [
    {
      title: '图标选择',
      key: 'iconSelect',
      sortable: true,
      type: 'icon-selector' // 字段类型
    },
    {
      title: '普通',
      key: 'iconSelect2',
      sortable: true,
      type: 'icon-selector',
      form: {
        component: { // 组件参数配置
          props: {
            'user-input': false 
          }
        }
      }
    }
  ]
}
`,
  template: `
  `
}
