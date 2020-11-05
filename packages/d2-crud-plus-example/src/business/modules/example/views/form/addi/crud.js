export const crudOptions = {
  options: {
    // height: null,
    // maxHeight: null
    height: '100%'
  },
  pageOptions: {
    compact: true // 是否紧凑型页面
  },
  searchOptions: {
    show: false
  },
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
    pageSizes: [10, 20]
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
      key: 'text',
      form: {
        component: {
          on: {
            blur: (context) => {
              console.log('on blur', context)
            }
          }
        }
      }
    }
  ]
}
