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
      title: '多级表头',
      key: 'multi_header',
      children: [
        {
          title: '时间',
          children: [
            {
              title: '日期',
              key: 'date',
              sortable: true,
              type: 'date',
              search: { disabled: true },
              form: { disabled: true }
            },
            {
              title: '日期2',
              key: 'date2',
              sortable: true,
              type: 'date',
              search: { disabled: true },
              form: { disabled: false }
            }
          ]
        },
        {
          title: '状态',
          key: 'status',
          sortable: true,
          search: { key: 'status', disabled: false },
          type: 'select',
          dict: { url: '/dicts/OpenStatusEnum' }
        }
      ]
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
    }
  ]
}
