export const crudOptions = {
  columns: [
    {
      title: '省市区',
      key: 'pca',
      type: 'area-selector',
      form: {
        helper: '获取到的值为code'
      }
    }, {
      title: '值为名称',
      key: 'pca2',
      type: 'area-selector',
      dict: { value: 'name' },
      form: {
        helper: '获取到的值为name'
      }
    }
  ]
}
