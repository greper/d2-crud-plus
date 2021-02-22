export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true // 是否紧凑型页面
    },
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    formOptions: {
      defaultSpan: 12 // 默认的表单 span
    },
    searchOptions: {
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 90,
        search: { slot: true },
        form: {
          disabled: true
        }
      },
      {
        title: '单选远程',
        key: 'status',
        sortable: true,
        search: {
          disabled: false,
          itemProps: {
            rules: [{ required: true, message: '此项必填' }]
          }
        },
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        minWidth: 200
      },
      {
        title: '单选本地',
        key: 'select_local',
        sortable: true,
        search: {
          disabled: true
        },
        type: 'select',
        dict: {
          data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
        },
        minWidth: 200
      },
      {
        title: '多选本地',
        key: 'mselect',
        sortable: true,
        search: {
          disabled: false,
          order: 1 // 越小越靠前
        },
        type: 'select',
        form: {
          component: {
            props: {
              filterable: true,
              multiple: true,
              clearable: true
            }
          }
        },
        dict: {
          data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
        },
        minWidth: 200
      },
      {
        title: 'radio',
        key: 'status2',
        sortable: true,
        search: { disabled: false },
        type: 'radio',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        minWidth: 200
      }

    ]
  }
}
