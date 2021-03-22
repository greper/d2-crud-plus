
export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%'
    },
    viewOptions: {
      componentType: 'row'
    },
    formOptions: {
      maxHeight: true,
      defaultSpan: 12 // 默认的表单 span
    },
    searchOptions: {
      labelWidth: '100px' // 设置查询表单label的宽度
    },
    rowHandle: {
      edit: {
        title: '添加'
      }
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 50,
        form: {
          disabled: true
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
        title: '级联单选',
        key: 'cascader2',
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
        title: '切换数据源',
        key: 'switch',
        sortable: true,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '开启' }, { value: false, label: '关闭' }] },
        form: {
          component: {
            span: 24
          },
          valueChange (key, value, form, { getColumn, getComponent }) {
            console.log('您选中了：', value)
            const url = value ? '/select/cascadeData' : '/dicts/cascader'
            const changeSource = getColumn('changeSource')
            changeSource.component.show = false
            changeSource.component.props.dict.url = url
            changeSource.component.props.dict.data = null
            vm.$nextTick(() => {
              changeSource.component.show = true
              console.log('show', url, changeSource.component)
            })
          }
        },
        component: {
          props: {
            effect: 'plain'
          }
        }
      },
      {
        title: '级联',
        key: 'changeSource',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'cascader',
        dict: {
          url: '/select/cascadeData'
        },
        form: {
          component: { show: true }
        }

      }
    ]
  }
}
