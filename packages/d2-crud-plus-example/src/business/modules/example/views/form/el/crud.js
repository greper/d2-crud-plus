export const crudOptions = {
  columns: [
    {
      title: '数字',
      key: 'number',
      type: 'number'
    },
    {
      title: '开关',
      key: 'switch',
      type: 'switch'
    },
    {
      title: '滑块',
      key: 'slider',
      type: 'slider'
    },
    {
      title: '评分',
      key: 'rate',
      type: 'rate'
    },
    {
      title: '颜色',
      key: 'color-picker',
      type: 'color-picker'
    },
    {
      title: '穿梭框',
      key: 'transfer',
      type: 'transfer',
      form: {
        component: { span: 24 }
      }
    }
  ]
}
