
export const crudOptions = (vm) => {
  return {
    columns: [
      {
        title: '行编辑',
        key: 'status',
        sortable: true,
        search: {},
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum',
          data: undefined
        },
        width: '150px',
        form: {
          rules: [{ required: true, message: '请选择一个选项' }],
          valueChange (key, value) {
            console.log('-----你选择了', value, vm.crud.columnsMap.status.component.props.dict.dataMap[value].label)
          }
        },
        component: {
          name: 'dict-select'
        }
      },
      {
        title: 'blank',
        key: 'blank'
      },
      {
        title: '开关',
        key: 'switch',
        sortable: true,
        search: {},
        type: 'switch',
        width: '150px',
        form: {
          valueChange (key, value) {
            console.log('-----你选择了', value, vm.crud.columnsMap.switch.component.props.dict.dataMap[value].label)
          }
        }
      }
    ]
  }
}
