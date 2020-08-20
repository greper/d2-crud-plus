export const crudOptions = {
  options: {
    height: '100%' // 表格高度100%, 使用toolbar必须设置
  },
  columns: [
    {
      title: '日期',
      key: 'date',
      sortable: true,
      type: 'date',
      search: { disabled: true },
      form: { disabled: true }
    },
    {
      title: '状态',
      key: 'status',
      sortable: true,
      search: { key: 'status', disabled: false },
      type: 'select',
      form: { rules: [{ required: true, message: '请选择状态' }] },
      dict: { url: '/dicts/OpenStatusEnum' }
    },
    {
      title: '地区',
      key: 'province',
      sortable: true,
      search: { key: 'province', disabled: false },
      type: 'select',
      form: {
        rules: [{ required: true, message: '请选择地区' }],
        component: { props: { filterable: true, multiple: true, clearable: true } }
      },
      dict: {
        data: [
          { value: 'sz', label: '深圳' },
          { value: 'gz', label: '广州' },
          { value: 'wh', label: '武汉' },
          { value: 'sh', label: '上海' }
        ]
      }
    },
    {
      title: '嵌套表格',
      key: 'nestId',
      sortable: true,
      form: {
        slot: true,
        component: {
          span: 24
        }
      }
    }
  ]
}
