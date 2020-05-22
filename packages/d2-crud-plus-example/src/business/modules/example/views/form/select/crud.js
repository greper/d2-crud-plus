export const crudOptions = (vm) => {
  return {
    columns: [
      {
        title: '单选，远程',
        key: 'status',
        sortable: true,
        search: {},
        type: 'select',
        dict: {
          url: '/api/dicts/OpenStatusEnum'
        },
        form: {
          valueChange (key, value) {
            console.log('-----你选择了', value, vm.crud.columnsMap.status.dict.dataMap[value].label)
          }
        }
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
        }
      },
      {
        title: '级联',
        key: 'cascader',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'cascader',
        dict: {
          url: '/api/select/cascadeData'
        }
      },
      {
        title: '级联多选',
        key: 'mcascader',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'cascader-multi',
        dict: {
          url: '/api/select/cascadeData'
        }
      },
      {
        title: 'radio',
        key: 'status2',
        sortable: true,
        search: { disabled: false },
        type: 'radio',
        dict: {
          url: '/api/dicts/OpenStatusEnum'
        },
        form: { component: { span: 24 } }
      },
      {
        title: 'checkbox',
        key: 'status3',
        sortable: true,
        search: { disabled: false },
        type: 'checkbox',
        dict: {
          url: '/api/dicts/OpenStatusEnum'
        },
        form: {
          valueChange (key, value, form) {
            console.log('您选中了：', value)
            let options = vm.crud.columnsMap.status3.dict.data.filter(item => {
              return value.indexOf(item.value) >= 0
            })
            vm.$refs.d2Crud.handleFormTemplateMode('checkedRadio').component.props.options = options
            // form.checkedRadio = '1'
            // form.status = '2'
          },
          helper: '此处选中的项目，是右边【选中联动】radio的选项'
        }
      },
      {
        title: '选中联动',
        key: 'checkedRadio',
        sortable: true,
        search: { disabled: true },
        type: 'radio',
        form: {
          component: {
            props: {
              options: undefined // 这里要预先定义一个参数，用来绑定，否则无法联动
            }
          },
          helper: '这里的选项是checkbox的选中项目'
        }
      }
    ]
  }
}
