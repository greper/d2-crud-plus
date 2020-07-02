import request from '@/business/api/request.mock'
function radioOptionsChanged (vm, value) {
  const checkbox = vm.getEditFormTemplate('checkbox')// 相当于 vm.$refs.d2Crud.handleFormTemplateMode('checkedRadio')
  const checkedRadio = vm.getEditFormTemplate('checkedRadio')
  if (checkedRadio == null || checkbox == null) {
    return
  }
  console.log('component.dict', checkbox)
  // 获取checkbox选中的选项
  const options = checkbox.component.props.dict.data.filter(item => {
    return value.indexOf(item.value) >= 0
  })
  // 直接修改DictRadio的options 它的优先级比dict.data高
  checkedRadio.component.props.options = options
}
export const crudOptions = (vm) => {
  return {
    formOptions: {
      defaultSpan: 12 // 默认的表单 span
    },
    columns: [
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
      },
      {
        title: '字典请求覆盖',
        key: 'status_custom_1',
        sortable: true,
        search: {},
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum2', // 配置url，可以缓存字典数据
          getData (url, dict) { // 覆盖全局获取字典请求配置
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
          value: '2', // 添加时的初始值
          helper: 'dict.getData可以覆盖全局配置的getRemoteDictFunc'
        }
      },
      {
        title: '字典自定义',
        key: 'status_custom_2',
        sortable: true,
        search: {},
        type: 'select',
        disabled: true, // url()方式无法缓存字典数据，不建议在列表中展示，会有性能问题（除非自行处理缓存）
        dict: {
          url: (dict) => { // 此方式无法缓存数据
            console.log('我是从自定义的url方法中加载的数据字典', dict)
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
          value: '2', // 添加时的初始值
          helper: 'dict.url可以直接配置一个ajax请求获取数据字典'
        }
      },
      {
        title: '禁用字典缓存',
        key: 'disableCache',
        sortable: true,
        search: {},
        type: 'select',
        disabled: true, // url()方式无法缓存字典数据，不建议在列表中展示，会有性能问题（除非自行处理缓存）
        dict: {
          url: '/dicts/OpenStatusEnum2',
          cache: false
        },
        form: {
          helper: '禁用字典缓存，每次打开对话框都会发出字典请求'
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
          },
          component: {
            props: {
              dict: {
                url: '/dicts/OpenStatusEnum',
                onReady: (data, dict) => {
                  // 在字典加载完成后触发修改联动radio的选项。
                  const value = vm.getEditForm().checkbox
                  radioOptionsChanged(vm, value || [])
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
        title: '开关组件',
        key: 'switch',
        sortable: true,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '开启' }, { value: false, label: '关闭' }] },
        form: {
          component: {
            span: 24,
            events: {
              blur: () => {
                console.log('on blur')
              }
            }
          },
          valueChange (key, value, form) {
            console.log('您选中了：', value)
          }
        }
      }
    ]
  }
}
