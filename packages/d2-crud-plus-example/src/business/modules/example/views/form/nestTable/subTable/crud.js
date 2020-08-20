export const crudOptions = {
  formOptions: {
    appendToBody: true // 子表格必须 否则弹出对话框无法显示最顶层
  },
  options: {
    height: '100%', // 表格高度100%, 使用toolbar必须设置
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
