import request from '@/business/api/request.mock'
import XEUtils from 'xe-utils'

export const crudOptions = {
  rowHandle: {
    // columnHeader: '操作',
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
    fixed: 'right'
  },
  pagination: {
    pageSizes: [10, 30, 50, 100, 200]
  },
  pageOptions: {
    compact: true // 是否紧凑型页面
  },
  options: {
    tableType: 'vxe-table',
    rowKey: true, // 必须设置，true or false
    rowId: 'id',
    height: '100%', // 表格高度100%, 使用toolbar必须设置
    highlightCurrentRow: true,

    treeConfig: { // 树形数据配置
      lazy: true,
      children: 'children',
      hasChild: 'hasChildren',
      loadMethod: ({ row }) => {
        return request({
          url: '/vxe/column/children',
          method: 'get',
          data: { id: row.id }
        }).then(ret => {
          console.log('懒加载数据', ret.data)
          return ret.data
        })
      },
      iconLoaded: 'el-icon-loading' // 美化loading图标
    },
    showFooter: true, // 合计行
    footerMethod: ({ columns, data }) => {
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('合计')
        } else {
          let sumCell = null
          switch (column.property) {
            case 'amount':
              sumCell = XEUtils.sum(data, column.property)
              break
          }
          sums.push(sumCell)
        }
      })
      // 返回一个二维数组的表尾合计
      return [sums]
    }
  },
  indexRow: { // 或者直接传true,不显示title，不居中
    title: '序号',
    align: 'center',
    width: 100
  },
  selectionRow: { // 多选列
    align: 'center',
    width: 100
  },
  expandRow: { // 行展开 或者直接传true,不显示title，不居中
    title: '展开',
    align: 'center',
    width: 100
  },
  columns: [
    {
      title: '数据列',
      key: 'data',
      sortable: true,
      width: 200,
      treeNode: true
    },
    {
      title: 'id',
      key: 'id',
      sortable: true,
      width: 100
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
      sortable: true,
      minWidth: 100
    },
    {
      title: 'blank',
      key: 'blank',
      sortable: true,
      width: 500
    }
  ]
}
