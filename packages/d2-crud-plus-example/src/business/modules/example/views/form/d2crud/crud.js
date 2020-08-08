export const crudOptions = (vm) => {
  return {
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
        title: '文本',
        key: 'text'
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
          component: {
            events: {
              ready: () => {
                console.log('status1, ready...')
              }
            }
          },
          // value: '2', // 添加时的初始值
          rules: [{ required: true, message: '请选择一个选项' }],
          valueChange (key, value) {
            console.log('-----你选择了', value, vm.crud.columnsMap.status.component.props.dict.dataMap[value].label)
          }
        }
      }
    ],
    formOptions: {
      defaultSpan: 12
    }
  }
}
