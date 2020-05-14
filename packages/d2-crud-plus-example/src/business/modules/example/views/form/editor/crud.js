export const crudOptions = {
  indexRow: { // 或者直接传true,不显示title，不居中
    title: '序号',
    align: 'center'
  },
  columns: [
    {
      title: 'id',
      key: 'id',
      sortable: true,
      width: 100,
      form: { disabled: true }
    },
    {
      title: '标题',
      key: 'title',
      sortable: true,
      form: { component: { span: 24 } }
    },
    {
      title: '内容',
      key: 'content',
      sortable: true,
      width: 300,
      type: 'editor-quill',
      disabled: true,
      form: { component: { } }
    }
  ]
}
