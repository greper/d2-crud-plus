export const crudOptions = `
 (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%'
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
        title: '单选远程',
        key: 'status',
        sortable: true,
        search: {},
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        view: { // 查看时的该字段单独配置
          component: { span: 18 }
        }
      },
      {
        title: '单选，本地',
        key: 'select_local',
        sortable: true,
        search: {
          disabled: true
        },
        type: 'select',
        dict: {
          data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
        }
      },
      {
        title: '多选,本地',
        key: 'mselect',
        sortable: true,
        search: {
          disabled: false,
          title: '多选1'
        },
        type: 'select',
        form: {
          title: '多选2',
          component: {
            props: {
              filterable: true,
              multiple: true,
              clearable: true
            }
          }
        },
        dict: {
          data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
        }
      },
      {
        title: '级联',
        key: 'cascader',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'cascader',
        dict: {
          url: '/select/cascadeData'
        },
        form: {
          component: { props: { elProps: { props: { checkStrictly: true } } } } // 可以不需要选到最后一级
        }
      },
      {
        title: '级联多选',
        key: 'mcascader',
        sortable: true,
        search: {
          disabled: true
        },
        type: 'cascader-multi',
        dict: {
          url: '/select/cascadeData'
        }
      },
      {
        title: 'radio',
        key: 'status2',
        sortable: true,
        search: { disabled: true },
        type: 'radio',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          component: { span: 24 }
        }
      },
      {
        title: 'checkbox',
        key: 'checkbox',
        sortable: true,
        search: { disabled: false },
        type: 'checkbox',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        view: { // 查看里面隐藏
          component: {
            show (context) {
              console.log('show context', context)
              return false
            }
          }
        }
      },
      {
        title: '开关组件',
        key: 'switch',
        sortable: true,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '开启' }, { value: false, label: '关闭' }] },
        form: {
          component: {
            span: 24
          },
          valueChange (key, value, form) {
            console.log('您选中了：', value)
          }
        }
      }
    ]
  }
}


`
