export const crudOptions = (vm) => {
  return {
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
        title: '单选远程',
        key: 'status',
        sortable: true,
        search: { disabled: false },
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        minWidth: 200
      }
    ]
  }
}
