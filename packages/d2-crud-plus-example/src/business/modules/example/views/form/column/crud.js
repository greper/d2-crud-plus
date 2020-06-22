import request from '@/business/api/request.mock'

export const crudOptions = {
  rowHandle: {
    // columnHeader: '操作',
    width: 300,
    custom: [
      {
        text: ' 自定义',
        type: 'warning',
        size: 'small',
        emit: 'customHandleBtn',
        icon: 'el-icon-s-flag'
      }
    ],
    fixed: 'right'
  },
  options: {
    highlightCurrentRow: true,
    rowKey: 'id',
    lazy: true,
    load: (tree, treeNode, resolve) => {
      console.log('--------', tree, treeNode)
      request({
        url: '/column/children?id=' + tree.id,
        method: 'get'
      }).then(ret => {
        console.log('懒加载数据', ret.data)
        resolve(ret.data)
      })
    },
    showSummary: true,
    summaryMethod (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  },
  indexRow: { // 或者直接传true,不显示title，不居中
    title: '序号',
    align: 'center'
  },
  selectionRow: {
    align: 'center',
    width: 100
  },
  expandRow: { // 或者直接传true,不显示title，不居中
    title: '展开',
    align: 'center'
  },
  columns: [
    {
      title: '数据列',
      key: 'data',
      sortable: true,
      width: 200
    },
    {
      title: '时间',
      key: 'time',
      type: 'datetime',
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
      },
      width: 300
    },
    {
      title: '金额(元)',
      key: 'amount',
      sortable: true
    }
  ]
}
