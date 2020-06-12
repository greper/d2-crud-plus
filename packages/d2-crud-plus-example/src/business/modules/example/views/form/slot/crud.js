export const crudOptions = {
  columns: [
    {
      title: '创建时间',
      key: 'createDate',
      type: 'datetime',
      rowSlot: true,
      width: 200
    },
    {
      title: '插槽式',
      key: 'slotExample',
      // type: 'slot-all', // slot-all等效
      sortable: true,
      search: {
        disabled: false,
        slot: true
      },
      form: {
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
          span: 24
        }
      }
    }
  ],
  formOptions: {
    footer: {
      slot: true // 自定义编辑框按钮slot ， slot名称为 FormFooterSlot
    },
    center: true // 标题与按钮居中布局
  },
  rowHandle: {
    width: 400,
    custom: [
      {
        text: '自定义按钮',
        type: 'warning',
        size: 'small',
        emit: 'custom-emit'
      }
    ]
  }
}
