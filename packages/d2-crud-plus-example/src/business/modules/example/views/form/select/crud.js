import request from '@/business/api/request.mock'
export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%'
    },
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
            },
            span: 18
          },
          // value: '2', // 添加时的初始值
          rules: [{ required: true, message: '请选择一个选项' }],
          valueChange (key, value) {
            if (value != null) {
              console.log('-----你选择了', value, vm.crud.columnsMap.status.component.props.dict.dataMap[value].label)
            } else {
              console.log('-----你选择了', value)
            }
          },
          helper: {
            render (h) {
              return (<el-alert title="当此处显示的是value而不是label时，请检查value的类型是否一致，string和int是不相等的" type="warning"/>)
            }
          }
        },
        component: {
          on: {
            click (event) {
              console.log('点击事件', event)
            }
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
          url: '/dicts/OpenStatusEnum', // 配置url，可以缓存字典数据
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
        disabled: true,
        dict: {
          url: (dict) => {
            return '/dicts/OpenStatusEnum?a=0'
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
        disabled: false,
        dict: {
          url: '/dicts/OpenStatusEnum',
          cache: true // 列表中展示建议启用缓存，否则会每一行都请求一次
        },
        form: {
          component: {
            props: {
              dict: {
                cache: false // 表单的dict可以禁用缓存
              }
            }
          },
          helper: '禁用字典缓存，每次打开对话框都会发出字典请求'
        }
      },
      {
        title: '禁用字典选项',
        key: 'disabledOptions',
        sortable: true,
        search: {},
        type: 'select',
        disabled: true,
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          component: {
            props: {
              onReady ({ component, data, setDictData }) {
                console.log('字典请求ready', data, component)
                data[0].disabled = true // 禁用某个选项， 还可以自己修改选项

                setDictData(data)
              }
            }
          },
          helper: '禁用字典选项'
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
          disabled: false,
          title: '多选1'
        },
        type: 'select',
        form: {
          title: '多选2',
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
        },
        form: {
          component: {
            props: {
              elProps: {
                showAllLevels: false, // 仅显示最后一级
                props: {
                  checkStrictly: true, // 可以不需要选到最后一级
                  emitPath: false
                }
              }
            }
          }
        }
      },
      {
        title: '级联多选',
        key: 'mcascader',
        sortable: true,
        search: {
          disabled: true
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
        search: { disabled: true },
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
        search: { disabled: false, component: { props: { dict: { onReady () {} } } } }, // 查询的时候触发一个空方法
        type: 'checkbox',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          valueChange (key, value, form, { getColumn, mode, getComponent, component }) {
            console.log('您选中了：', value)
            if (value == null) {
              return
            }
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
          },
          component: {
            props: {
              dict: {
                url: '/dicts/OpenStatusEnum',
                onReady: (data, dict, { component }) => {
                  const value = vm.getEditForm().checkbox
                  // 在字典加载完成后触发一次valueChange
                  component.onChange(value)
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
