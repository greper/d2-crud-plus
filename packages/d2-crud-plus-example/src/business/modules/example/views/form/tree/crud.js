export const crudOptions = {
  options: {
    height: '100%'
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
      title: '树形多选',
      key: 'tree1',
      type: 'tree-selector',
      dict: { url: '/area/tree', isTree: true, value: 'id' },
      form: {
        component: { span: 24 },
        rules: [{ required: true, message: '请选择' }],
        helper: '树形，忽略完全选中节点的子节点，精简结果'
      }
    },
    {
      title: '树形选择2',
      key: 'tree2',
      type: 'tree-selector',
      dict: { url: '/area/tree', isTree: true, value: 'id' },
      form: {
        component: {
          span: 24,
          props: { ignoreFullCheckedChildren: false, leafOnly: true, includeHalfChecked: false }
        },
        rules: [{ required: true, message: '请选择', trigger: 'change' }],
        helper: '树形，不忽略完全选中节点的子节点，只需要叶子节点'
      }
    },
    {
      title: '树形单选',
      key: 'tree3',
      type: 'tree-selector',
      dict: { url: '/area/tree', isTree: true, value: 'id' },
      form: {
        component: {
          span: 24,
          props: { multiple: false }
        },
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      }
    }
  ]
}
