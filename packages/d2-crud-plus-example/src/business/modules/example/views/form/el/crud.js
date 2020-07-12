export const crudOptions = {
  columns: [
    {
      title: '数字',
      search: {},
      key: 'number',
      type: 'number'
    },
    {
      title: '开关',
      key: 'switch',
      type: 'switch'
    },
    {
      title: '滑块',
      key: 'slider',
      type: 'slider'
    },
    {
      title: '评分',
      key: 'rate',
      type: 'rate'
    },
    {
      title: '颜色',
      key: 'color-picker',
      type: 'color-picker'
    },
    {
      title: '穿梭框',
      key: 'transfer',
      type: 'transfer',
      form: {
        component: { span: 24 }
      }
    },
    {
      title: '输入建议（autocomplete）',
      key: 'autocomplete',
      search: {},
      type: 'autocomplete',
      form: {
        component: {
          props: {
            fetchSuggestions: (queryString, callback) => {
              const ret = [
                { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
                { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' }
              ]
              callback(ret)
            }
          },
          events: {
            select (event) {
              console.log('autocomplete select:', event)
            }
          },
          slots: {
            suffix: (h) => {
              return (<i class="el-icon-edit el-input__icon"/>)
            }
          },
          scopedSlots: {
            // 自定义列表项
            default: (h, scope) => {
              return (<div class='form-el-autocomplete'><div class="name">{scope.item.value}</div><span class="addr">{scope.item.address}</span></div>)
            },
            suffix: () => {
              return (<i class="el-icon-edit el-input__icon"/>)
            }
          },
          span: 24
        }
      }
    }
  ]
}
