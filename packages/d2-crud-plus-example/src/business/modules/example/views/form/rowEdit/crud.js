export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true // 是否紧凑型页面
    },
    options: {
      lineEdit: {
        validation: true // 行编辑是否需要校验
      },
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    formOptions: {
      type: 'drawer',
      draggable: false,
      fullscreen: false,
      size: '50%',
      saveRemind: true,
      defaultSpan: 12 // 默认的表单 span
    },
    rowHandle: {
      width: 260,
      fixed: 'right',
      edit: {
        show: false
      },
      lineEdit: {
        text: '行编辑',
        size: 'small'
      },
      lineEditSave: {
        show: true,
        size: 'small'
      },
      lineEditCancel: {
        size: 'small'
      }
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
        title: '文本',
        key: 'text1',
        sortable: true,
        minWidth: 100,
        form: {
          rules: [{ required: true, message: '此项必填' }]
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
        form: {
          rules: [{ required: true, message: '此项必填' }]
        },
        minWidth: 100
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
          },
          rules: [{ required: true, message: '此项必填' }]
        },
        dict: {
          data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
        },
        minWidth: 100
      },
      {
        title: 'radio',
        key: 'radio',
        type: 'radio',
        sortable: true,
        minWidth: 100,
        dict: { data: [{ value: '1', label: '开启' }, { value: '0', label: '关闭' }] }
      },
      {
        title: 'checkbox',
        key: 'checkbox',
        sortable: true,
        type: 'checkbox',
        minWidth: 100,
        dict: { data: [{ value: '1', label: '开启' }, { value: '0', label: '关闭' }] }
      },
      {
        title: 'switch',
        key: 'switch',
        sortable: true,
        type: 'dict-switch',
        minWidth: 100,
        dict: { data: [{ value: true, label: '开启' }, { value: false, label: '关闭' }] }
      }

    ]
  }
}
