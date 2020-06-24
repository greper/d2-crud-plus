import request from '@/business/api/request.mock'
function radioOptionsChanged (vm, value) {
  const checkbox = vm.getEditFormTemplate('checkbox')// 相当于 vm.$refs.d2Crud.handleFormTemplateMode('checkedRadio')
  const checkedRadio = vm.getEditFormTemplate('checkedRadio')
  if (checkedRadio == null || checkbox == null) {
    return
  }
  // 获取checkbox选中的选项
  const options = checkbox.component.props.dict.data.filter(item => {
    return value.indexOf(item.value) >= 0
  })
  // 直接修改DictRadio的options 它的优先级比dict.data高
  checkedRadio.component.props.options = options

  // 注意：新版本已不支持 vm.crud.columnsMap[columnKey].dict 方式获取
  // eslint-disable-next-line no-unused-expressions
  vm.crud.columnsMap.checkbox.dict.data
  // eslint-disable-next-line no-unused-expressions
  vm.crud.columnsMap.checkbox.dict.dataMap
  console.log('component.dict', vm.crud.columnsMap.checkbox.component.props.dict.data)
}
function disabledAllChanged (vm, key, value, form) {
  for (const formKey in form) {
    if (formKey === key) {
      continue
    }
    const column = vm.getEditFormTemplate(formKey)
    if (column && column.component.props) {
      column.component.props.disabled = value
      if (column.component.props.elProps) {
        column.component.props.elProps.disabled = value
      }
    }
  }
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
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          rules: [{ required: true, message: '请选择一个选项' }],
          valueChange (key, value) {
            console.log('-----你选择了', value, vm.crud.columnsMap.status.component.props.dict.dataMap[value].label)
          },
          helper: '如果这里没有显示label而是只显示value，请检查value值类型是否一致，int和string类型是不相等的'
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
              url: '/dicts/OpenStatusEnum',
              method: 'post',
              data: { a: 1 }
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
        title: '单选，本地',
        key: 'select_local',
        sortable: true,
        search: {
          disabled: true
        },
        type: 'select',
        dict: {
          data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
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
        form: {
          rules: [{ required: true, message: '请选择一个选项' }],
          component: { span: 24 },
          helper: 'rule校验，我是必填项'
        }
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
      },
      {
        title: '动态显示',
        key: 'show',
        sortable: true,
        search: { disabled: true },
        type: 'radio',
        dict: { data: [{ value: true, label: '显示' }, { value: false, label: '隐藏' }] },
        form: {
          valueChange (key, value, form) {
            console.log('您选中了：', value, vm.getEditFormTemplate('show_ret'))
            vm.getEditFormTemplate('show_ret').component.show = value
            // vm.$set(vm.getEditFormTemplate('show_ret').component, 'show', value)
          },
          component: {
            props: {
              dict: {
                onReady: (data, dict) => {
                  const value = vm.getEditForm().show
                  vm.getEditFormTemplate('show_ret').component.show = value
                }
              }
            }
          },
          helper: '点击显示与隐藏右边整个字段',
          span: 24
        }
      },
      {
        title: '显示与隐藏',
        key: 'show_ret',
        sortable: true,
        search: { disabled: true },
        disabled: true,
        form: {
          component: {
            show: () => {
              return vm.show
            },
            props: {
              disabled: false
            }
          }
        }
      },
      {
        title: '禁用启用',
        key: 'disableAll',
        sortable: true,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '禁用全部' }, { value: false, label: '启用' }] },
        form: {
          component: {
            span: 24,
            dict: {
              onReady () {
                disabledAllChanged(vm, 'disableAll', vm.getEditForm().disableAll, vm.getEditForm())
              }
            },
            events: {
              blur: () => {
                console.log('on blur')
              }
            }
          },
          valueChange (key, value, form) {
            console.log('您选中了：', value)
            disabledAllChanged(vm, key, value, form)
          }
        }
      }
    ]
  }
}
