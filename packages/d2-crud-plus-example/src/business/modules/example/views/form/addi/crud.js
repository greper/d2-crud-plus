export const crudOptions = {
  columns: [
    {
      title: '创建时间',
      key: 'createDate',
      type: 'datetime',
      width: 200
    },
    {
      title: '分组字段',
      key: 'text'
    }
  ],
  formGroup: {
    groups: {
      jsx: {
        title: '分组',
        columns: ['text']
      }
    }
  },
  formOptions: {
    defaultSpan: 12
  }
}
