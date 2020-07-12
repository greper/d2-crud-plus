export const crudOptions = {
  options: {
    height: '100%' // 表格高度100%, 使用toolbar必须设置
  },
  columns: [
    {
      title: '字段类型',
      key: 'date',
      align: 'left',
      type: 'time2',
      search: {}
    }
  ]
}
