export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%'
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
        title: '文本',
        key: 'text',
        type: 'text',
        search: { show: true },
        sortable: true
      },
      {
        title: '文本域',
        key: 'text-area',
        sortable: true,
        search: { disabled: true },
        type: 'text-area'
      }
    ]
  }
}
