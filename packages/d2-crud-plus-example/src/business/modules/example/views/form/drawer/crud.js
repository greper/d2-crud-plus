export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true // 是否紧凑型页面
    },
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    formOptions: {
      type: 'drawer',
      draggable: false,
      fullscreen: null,
      size: '50%',
      saveRemind: true,
      defaultSpan: 12 // 默认的表单 span
    },
    rowHandle: {
      width: 260
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
        title: '单选远程',
        key: 'status',
        sortable: true,
        search: {},
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        minWidth: 200
      },
      {
        title: '默认隐藏',
        key: 'text1',
        show: false,
        sortable: true,
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '单选，本地',
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
        title: '多选,本地',
        key: 'mselect',
        sortable: true,
        search: {
          disabled: false
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
      }

    ]
  }
}
