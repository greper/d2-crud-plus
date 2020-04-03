export const crudOptions = {
  columns: [
    {
      title: '多级表头',
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
              title: '日期',
              key: 'date2',
              sortable: true,
              type: 'date',
              search: { disabled: true },
              form: { disabled: true }
            }
          ]
        },
        {
          title: '状态',
          key: 'status',
          sortable: true,
          search: { key: 'status', disabled: false },
          type: 'select',
          form: { rules: [{ required: true, message: '请选择状态' }] },
          dict: { url: '/api/dicts/OpenStatusEnum' }
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
    }
  ]
}
