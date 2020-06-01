import request from '@/plugin/axios'
function radioOptionsChanged (vm, value) {
  let checkbox = vm.getEditFormTemplate('checkbox')// 相当于 vm.$refs.d2Crud.handleFormTemplateMode('checkedRadio')
  let checkedRadio = vm.getEditFormTemplate('checkedRadio')
  if (checkedRadio == null || checkbox == null) {
    return
  }
  // 获取checkbox选中的选项
  let options = checkbox.component.props.dict.data.filter(item => {
    return value.indexOf(item.value) >= 0
  })
  // 直接修改DictRadio的options 它的优先级比dict.data高
  checkedRadio.component.props.options = options

  // 注意：新版本已不支持 vm.crud.columnsMap[columnKey].dict 方式获取
  // eslint-disable-next-line no-unused-expressions
  vm.crud.columnsMap['checkbox'].dict.data
  // eslint-disable-next-line no-unused-expressions
  vm.crud.columnsMap['checkbox'].dict.dataMap
  console.log('component.dict', vm.crud.columnsMap['checkbox'].component.props.dict.data)
}
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
          url: '/dicts/OpenStatusEnum',
          data: undefined
        },
        form: {
          rules: [{ required: true, message: '请选择一个选项' }],
          valueChange (key, value) {
            console.log('-----你选择了', value, vm.crud.columnsMap.status.dict.dataMap[value].label)
          }
        }
      },
      {
        title: '字典请求覆盖',
        key: 'status_custom_1',
        sortable: true,
        search: {},
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum',
          getData (url, dict) {
            console.log('我是从自定义的getData方法中加载的数据字典', dict)
            return request({
              url: url,
              method: 'post'
            }).then(ret => {
              return ret.data
            })
          }
        },
        form: {
          helper: 'dict.getData可以覆盖全局配置的getRemoteDictFunc'
        }
      },
      {
        title: '字典自定义',
        key: 'status_custom_2',
        sortable: true,
        search: {},
        type: 'select',
        dict: {
          url: (dict) => {
            console.log('我是从自定义的getData方法中加载的数据字典', dict)
            return request({
              url: '/dicts/OpenStatusEnum?a=2',
              method: 'post'
            }).then(ret => {
              return ret.data
            })
          }
        },
        form: {
          helper: 'dict.url可以直接配置一个ajax请求获取数据字典'
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
          url: '/select/cascadeData'
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
          url: '/select/cascadeData'
        }
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
        form: { rules: [{ required: true, message: '请选择一个选项' }], component: { span: 24 } }
      },
      {
        title: 'checkbox',
        key: 'checkbox',
        sortable: true,
        search: { disabled: false },
        type: 'checkbox',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          valueChange (key, value, form) {
            console.log('您选中了：', value)
            radioOptionsChanged(vm, value)
            // form.checkedRadio = '1'
            // form.status = '2'
          },
          component: {
            props: {
              dict: {
                url: '/dicts/OpenStatusEnum',
                onReady: (data, dict) => {
                  let value = vm.getEditForm().checkbox
                  if (value == null) {
                    value = []
                  }
                  radioOptionsChanged(vm, value)
                }
              }
            }
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
        dict: { data: undefined },
        form: {
          component: {
            props: {
              options: undefined // 这里要预先定义一个参数，用来绑定，否则无法联动
            }
          },
          helper: '这里的选项是checkbox的选中项目'
        },
        component: {
          props: { dict: { url: '/dicts/OpenStatusEnum' } }
        }
      }
    ]
  }
}
