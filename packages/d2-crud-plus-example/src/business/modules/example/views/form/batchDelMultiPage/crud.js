export const crudOptions = {
  options: {
    height: '100%',
    rowKey: 'id',
    onSelect () {
      console.log('111selected')
    }
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
      width: 200,
      search: {}
    },
    {
      title: 'text',
      key: 'text'
    }
  ]
}
