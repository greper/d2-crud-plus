export const crudOptions = {
  columns: [
    {
      title: '图标选择',
      key: 'iconSelect',
      sortable: true,
      type: 'icon-selector'
    },
    {
      title: '用户可输入',
      key: 'iconSelect2',
      sortable: true,
      type: 'icon-selector',
      form: {
        component: {
          props: {
            'user-input': true
          }
        }
      }
    }
  ]
}
