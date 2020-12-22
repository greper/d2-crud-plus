export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%'
    },
    formOptions: {
      defaultSpan: 12
    },
    rowHandle: {
      dropdown: { // 操作列折叠
        atLeast: 1, // 至少1个以上的按钮才会被折叠
        text: '更多', // dropdown按钮文字
        type: 'warning',
        icon: 'el-icon-more'
      },
      fixed: 'right',
      view: {
        text: '查看'
      },
      edit: {
        thin: true,
        type: 'primary',
        text: '编辑'
      },
      remove: {
        thin: true,
        order: 1000,
        text: '删除'
      },
      width: 220,
      custom: [
        { icon: 'el-icon-share', text: '测试按钮1', emit: 'customBtn1' },
        { icon: 'el-icon-search', text: '测试按钮2', emit: 'customBtn2' }
      ]
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
        minWidth: 200
      },
      {
        title: '默认隐藏',
        key: 'text1',
        show: false,
        sortable: true,
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '禁用字典缓存',
        key: 'disableCache',
        sortable: true,
        search: {},
        type: 'select',
        disabled: true, // url()方式无法缓存字典数据，不建议在列表中展示，会有性能问题（除非自行处理缓存）
        dict: {
          url: '/dicts/_OpenStatusEnum',
          cache: false
        },
        form: {
          helper: '禁用字典缓存，每次打开对话框都会发出字典请求'
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
          disabled: false
        },
        type: 'select',
        form: {
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
        title: 'radio',
        key: 'status2',
        sortable: true,
        search: { disabled: false },
        type: 'radio',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          rules: [{ required: true, message: '请选择一个选项' }],
          component: { span: 24 },
          helper: 'rule校验，我是必填项'
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
            span: 24,
            events: {
              blur: () => {
                console.log('on blur')
              }
            }
          },
          valueChange (key, value, form) {
            console.log('您选中了：', value)
          }
        }
      }
    ]
  }
}
