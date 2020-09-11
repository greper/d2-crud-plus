export const crudOptions = {
  options: {
    height: '100%',
    maxHeight: 'auto'
  },
  pageOptions: {
    compact: true // 是否紧凑型页面
  },
  searchOptions: {
    show: false
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
      title: '创建时间',
      key: 'createDate',
      type: 'datetime',
      width: 200
    },
    {
      title: '分组字段',
      key: 'text'
    }
  ],
  formGroup: {
    groups: {
      test: {
        title: '分组',
        icon: 'el-icon-star-off',
        columns: ['text']
      }
    }
  },
  formOptions: {
    defaultSpan: 12
  },
  pagination: {
    layout: 'prev, pager , next , jumper , -> , total '
  }
}
