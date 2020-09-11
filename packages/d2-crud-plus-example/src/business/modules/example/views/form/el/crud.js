export const crudOptions = {
  options: {
    height: '100%' // 表格高度100%, 使用toolbar必须设置
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      width: 90,
      form: {
        disabled: true
      }
    },
    {
      title: '数字',
      search: {},
      key: 'number',
      type: 'number'
    },
    {
      title: '开关',
      key: 'switch',
      type: 'switch',
      search: {
        disabled: false,
        component: {
          show (context) {
            return true
          }
        }
      },
      form: {
        component: {
          show (context) {
            return true
          }
        }
      },
      component: {
        disabled (context) {
          return !context.form.number
        }
      }
    },
    {
      title: '开关2',
      key: 'switch2',
      sortable: true,
      search: { disabled: false },
      type: 'dict-switch', // 区别在于这个是包装组件，支持dict，并且单元格使用tag展示
      dict: { data: [{ value: 1, label: '开启' }, { value: 0, label: '关闭' }] }
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
      },
      valueBuilder (row, col) {
        if (row[col.key] === '') {
          row[col.key] = null
        }
        // console.log('tranfer:', row, row[col.key], col.key)
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
            // 自定义列表项
            default: (h, scope) => {
              return (<div class='form-el-autocomplete'><div class="name">{scope.item.value}</div><span class="addr">{scope.item.address}</span></div>)
            }
          },
          children: [
            (h) => {
              return (<i slot='suffix' class="el-icon-edit el-input__icon"/>)
            }
          ],
          span: 24
        }
      }
    }
  ]
}
