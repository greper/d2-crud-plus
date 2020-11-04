export const crudOptions = {
  options: {
    height: '100%',
    maxHeight: 'auto'
  },
  formOptions: {
    updateTableDataAfterEdit: true,
    defaultSpan: 12
  },
  pageOptions: {
    compact: true // 是否紧凑型页面
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
      width: 200
    },
    {
      title: '数据',
      key: 'text',
      search: {}
    }
  ]

}
