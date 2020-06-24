export const crudOptions = {
  columns: [
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
    }
  ],
  group: {
    type: 'collapse', // tab
    groups: [
      { title: '商品基础', children: ['title', 'code', 'image'] },
      { title: '库存价格', children: ['store', 'price'] },
      { title: '详情', children: ['intro', 'content'] }
    ]
  }
}
