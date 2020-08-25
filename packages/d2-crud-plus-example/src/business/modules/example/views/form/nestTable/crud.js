export const crudOptions = {
  options: {
    height: '100%' // 表格高度100%, 新版页面必须设置
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      sortable: true,
      form: { disabled: true }
    },
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
      dict: { url: '/dicts/OpenStatusEnum' }
    },
    {
      title: '地区',
      key: 'province',
      sortable: true,
      search: { key: 'province', disabled: false },
      type: 'select',
      form: {
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
      title: '用户',
      key: 'nestId',
      sortable: true,
      form: { // 嵌套表格字段
        rules: [{ required: true, message: '请选择用户' }],
        slot: true, // 通过form slot 引入子表格，将子表格当做一个字段组件来用
        component: {
          span: 24
        }
      }
    }
  ]
}
