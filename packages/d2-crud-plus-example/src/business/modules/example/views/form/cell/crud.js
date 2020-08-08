
export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%'
    },
    selectionRow: {
      align: 'center',
      width: 100
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
          component: {
            disabled ({ form }) {
              return form.switch
            }
          },
          valueChange (key, value) {
            console.log('-----你选择了', value, vm.crud.columnsMap.status.component.props.dict.dataMap[value].label)
          }
        },
        component: {
          name: 'dict-select',
          disabled ({ form }) {
            return form.switch
          }
        }
      },
      {
        title: '禁用',
        key: 'switch',
        sortable: true,
        search: {},
        type: 'switch',
        width: '150px',
        form: {
          valueChange (key, value) {
            console.log('-----你选择了', value)
          }
        }
      },
      {
        title: 'blank',
        key: 'blank'
      }
    ]
  }
}
