export const crudOptions = {
  options: {
    height: '100%',
    rowKey: 'id'
  },
  selectionRow: {
    align: 'center',
    width: 46
  },
  pagination: {
    layout: 'slot, prev, pager , next , jumper , -> , total '
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
