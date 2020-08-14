export const crudOptions = {
  options: {
    height: '100%'
  },
  viewOptions: {
    componentType: 'form'
  },
  formOptions: {
    center: true // 标题与按钮居中布局
  },
  rowHandle: {
    width: 400,
    custom: [
      {
        text: '自定义排序',
        type: 'warning',
        size: 'small',
        emit: 'custom-emit',
        order: 1 // 数字越小越排前面
      }
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
      title: '创建时间',
      key: 'createDate',
      type: 'datetime',
      rowSlot: true,
      width: 200
    },
    {
      title: '更新时间',
      key: 'updateDate',
      type: 'datetime',
      rowSlot: true,
      width: 200,
      disabled: true
    },
    {
      title: 'slot自定义',
      key: 'slotExample',
      // type: 'slot-all', // slot-all等效
      sortable: true,
      search: {
        disabled: false,
        slot: true
      },
      form: {
        rules: [{ required: true, message: '请输入内容' }],
        slot: true,
        helper: { slot: true }
      },
      rowSlot: true
    },
    {
      title: '主题',
      key: 'topics',
      type: 'select',
      form: {
        slot: true
      }
    },
    {
      title: '自定义扩展',
      key: 'extends',
      type: 'demo-extend',
      form: {
        helper: '自定义扩展演示(d2-crud-plus-extends/src/demo-extends)',
        component: {
          slots: {
            test1: (h, scope) => {
              return (<span>--{scope.value}--</span>)
            }
          },
          span: 24
        }
      }
    },
    {
      title: 'jsx自定义',
      key: 'render',
      form: {
        component: {
          render: (h, scope) => {
            return (<div>表单render：{scope.value}</div>)
          },
          span: 24
        }
      },
      component: {
        render: (h, scope) => {
          return (<div>行render：{scope.value}</div>)
        }
      }
    },
    {
      title: '非vModel组件',
      key: 'imagePreview',
      form: { disabled: true },
      component: {
        name: 'el-image',
        valueProp: 'src',
        style: { height: '30px' },
        props: { fit: 'contain' },
        show ({ value }) {
          return value != null
        }
      }
    }
  ]
}
