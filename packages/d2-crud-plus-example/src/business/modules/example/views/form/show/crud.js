export const crudOptions = (vm) => {
  return {
    columns: [
      {
        title: '动态显隐',
        key: 'show',
        sortable: true,
        search: { disabled: true },
        type: 'radio',
        dict: { data: [{ value: true, label: '显示' }, { value: false, label: '隐藏' }] },
        form: {
          helper: '点击显示与隐藏右边整个字段',
          span: 12
        }
      },
      {
        title: '显隐目标',
        key: 'show_ret',
        sortable: true,
        search: { disabled: true },
        disabled: true,
        form: {
          component: {
            // 也可以直接配置 show:false 进行隐藏
            show: () => {
              return vm.getEditForm().show
            }
          }
        }
      },
      {
        title: '文本',
        key: 'text2',
        sortable: true,
        form: {
          component: {
            readonly: () => {
              console.log('text2', vm.getEditForm().readonly1)
              return vm.getEditForm().readonly1
            },
            span: 24
          }
        }
      },
      {
        title: 'textarea',
        key: 'text-area',
        sortable: true,
        search: { disabled: true },
        type: 'text-area',
        form: {
          component: {
            readonly: () => {
              return vm.getEditForm().readonly1
            }
          }
        }
      },
      {
        title: '只读',
        key: 'readonly1',
        sortable: true,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '只读' }, { value: false, label: '' }] },
        form: {
          component: {
            span: 24
          }
        }
      }

    ]
  }
}
