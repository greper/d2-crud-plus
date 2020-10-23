export const crudOptions = {
  rowHandle: {
    columnHeader: '操作列固定',
    width: 370,
    custom: [
      {
        text: ' 自定义',
        type: 'warning',
        size: 'small',
        emit: 'customHandleBtn',
        icon: 'el-icon-s-flag'
      }
    ],
    fixed: 'right' // 右边固定列
  },
  searchOptions: {
    columns: []
  },
  options: {
    height: '100%', // 表格高度100%, 使用toolbar必须设置
    rowKey: 'id'
  },
  viewOptions: {
    componentType: 'row'
  },
  pageOptions: {
    compact: true // 是否紧凑型页面
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
      title: '左边固定',
      key: 'data',
      sortable: true,
      width: 100,
      search: {},
      fixed: 'left',
      form: {
        component: {
          props: { },
          placeholder: '左边固定1'
        }
      }
    },
    {
      title: '时间',
      key: 'time',
      type: 'datetime',
      search: { disabled: false },
      sortable: true,
      width: 160
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
      },
      width: 300
    },
    {
      title: '金额(元)',
      key: 'amount',
      sortable: true,
      width: 100,
      type: 'number',
      fixed: 'right'
    },
    {
      title: '我把行宽度撑开，以展示固定列',
      key: 'bigWidth',
      sortable: true,
      width: 1000,
      form: {
        title: '撑开'
      }
    }
  ]
}
