export const crudOptions = {
  formOptions: {
    appendToBody: true // 子表格必须 否则弹出对话框无法显示最顶层
  },
  options: {
    height: '500px', // 子表格必须设置高度， 你也可以在这里设置100%，然后给子表格外面包一层有高度的div
    highlightCurrentRow: true,
    rowKey: 'id'
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      sortable: true,
      form: { disabled: true }
    },
    {
      title: '子表格日期',
      key: 'date',
      sortable: true,
      type: 'date',
      search: { disabled: true },
      form: { disabled: true }
    },
    {
      title: '名称',
      key: 'name',
      search: {},
      sortable: true
    }

  ]
}
