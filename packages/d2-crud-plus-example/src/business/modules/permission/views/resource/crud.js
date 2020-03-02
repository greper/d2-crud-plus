export const crudOptions = {
  columns: [
    {
      title: 'id',
      key: 'id',
      width: 100,
      // type: 'select',
      // search: { disabled: true }, // 开启查询
      form: { disabled: true }, // 表单配置
      // disabled: false, //是否隐藏列
      sortable: true
    },
    {
      title: '创建时间',
      key: 'create_time',
      type: 'datetime',
      // search: { disabled: true }, // 开启查询
      form: { disabled: true }, // 表单配置
      // disabled: false //是否隐藏列
      sortable: true
    },
    {
      title: '更新时间',
      key: 'update_time',
      type: 'datetime',
      // search: { disabled: true }, // 开启查询
      form: { disabled: true }, // 表单配置
      // disabled: false, // 是否隐藏列
      sortable: true
    },
    {
      title: '资源代码',
      key: 'name',
      sortable: true
      // type: 'select',
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
    },
    {
      title: '资源名称',
      key: 'title',
      sortable: true
      // type: 'select',
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
    },
    {
      title: '权限代码',
      key: 'permission',
      sortable: true
      // type: 'select',
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
    },
    {
      title: '前端路径',
      key: 'path',
      sortable: true
      // type: 'select',
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
    },
    {
      title: '前端组件路径',
      key: 'component',
      sortable: true
      // type: 'select',
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
    },
    {
      title: '图标',
      key: 'icon',
      sortable: true,
      type: 'avatar'
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
    },
    {
      title: '排序',
      key: 'sort',
      sortable: true
      // type: 'select',
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
    },
    {
      title: '菜单类型',
      key: 'type',
      type: 'select',
      dict: { url: '/base/dicts/ResourceTypeEnum' },
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
      sortable: true
    },
    {
      title: '父节点',
      key: 'parentId',
      sortable: true
      // type: 'select',
      // search: { disabled: true }, //开启查询
      // form: { disabled: true } //表单配置
      // disabled: false //是否隐藏列
    }
  ]
}
