export const crudOptions = {
  options: {
    height: '100%' // 表格高度100%, 使用toolbar必须设置
  },
  columns: [
    {
      title: 'id',
      key: 'id',
      width: 100,
      // type: 'select',
      // dict: { url: ''}, //数据字典
      // search: { disabled: false}, // 开启查询
      // disabled: true, // 隐藏列
      form: { // 表单配置
        disabled: true // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
      },
      sortable: true
    },
    {
      title: '创建时间',
      key: 'createTime',
      type: 'datetime',
      width: 152,
      // dict: { url: ''}, //数据字典
      // search: { disabled: false}, // 开启查询
      // disabled: true, // 隐藏列
      form: { // 表单配置
        disabled: true // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
      },
      sortable: true
    },
    {
      title: '修改时间',
      key: 'updateTime',
      type: 'datetime',
      width: 152,
      // dict: { url: ''}, //数据字典
      // search: { disabled: false}, // 开启查询
      // disabled: true, // 隐藏列
      form: { // 表单配置
        disabled: true// 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
      },
      sortable: true
    },
    {
      title: '平台代码',
      key: 'code',
      // type: 'select',
      // dict: { url: ''}, //数据字典
      search: { disabled: false }, // 开启查询
      // disabled: true, // 隐藏列
      form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
        editTemplateHandle (form) {
          form.component.disabled = true
        }
      },
      sortable: true
    },
    {
      title: '平台名称',
      key: 'name',
      // type: 'select',
      // dict: { url: ''}, //数据字典
      search: { disabled: false }, // 开启查询
      // disabled: true, // 隐藏列
      form: { // 表单配置
        // disabled: true, // 禁用表单编辑
        // rules: [{ required: true, message: '请输入' }]
      },
      sortable: true
    }
  ]
}
