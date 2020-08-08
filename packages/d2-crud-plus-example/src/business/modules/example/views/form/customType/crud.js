export const crudOptions = {
  options: {
    height: '100%' // 表格高度100%, 使用toolbar必须设置
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
      title: '字段类型',
      key: 'date',
      align: 'left',
      type: 'time2',
      search: {}
    }
  ]
}
