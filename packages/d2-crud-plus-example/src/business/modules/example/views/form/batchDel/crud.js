export const crudOptions = {
  options: {
    height: '100%',
    rowKey: 'id'
  },
  selectionRow: {
    align: 'center',
    width: 46
  },
  columns: [
    {
      title: '创建时间',
      key: 'createDate',
      type: 'datetime',
      width: 200,
      search: {}
    },
    {
      title: 'text',
      key: 'text'
    }
  ]
}
