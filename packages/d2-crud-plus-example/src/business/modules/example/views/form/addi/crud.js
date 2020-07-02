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
      test: {
        title: '分组',
        icon: 'el-icon-star-off',
        columns: ['text']
      }
    }
  },
  formOptions: {
    defaultSpan: 12
  }
}
