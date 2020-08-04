export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%'
    },
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
            show: ({ key, value, form }) => {
              console.log('show:', key, value, form)
              return form.show
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
            readonly: (context) => {
              console.log('text2 readonly context:', context)
              return context.form.readonly1
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
            readonly: ({ key, value, form }) => {
              console.log('text-area readonly', key, value, form)
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
