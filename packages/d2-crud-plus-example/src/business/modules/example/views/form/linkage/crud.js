export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%'
    },
    formOptions: {
      defaultSpan: 24 // 默认的表单 span
    },
    searchOptions: {
      valueChange: true // 搜索框开启valueChange
    },
    columns: [
      {
        title: '省',
        key: 'province',
        sortable: true,
        search: { disabled: false },
        type: 'select',
        dict: {
          url: '/linkage/province',
          value: 'id'
        },
        form: {
          rules: [{ required: true, message: '请选择省' }],
          /**
           *  valueChange 功能大大增强
           * @param key
           * @param value 当前选择的值
           * @param form 当前表单
           * @param getColumn 获取字段配置的方法，getColumn(keyName) 返回keyName的字段配置，可以动态修改组件配置
           * @param mode 当前模式:【add、edit、search】
           * @param component 当前组件的ref
           * @param immediate 是否是对话框打开后立即触发的
           * @param getComponent 获取组件Ref的方法， getComponent(keyName), 返回组件ref，可以动态调用该组件的方法
           */
          valueChange (key, value, form, { getColumn, mode, component, immediate, getComponent }) {
            form.city = undefined // 将“city”的值置空
            form.county = undefined// 将“county”的值置空
            if (value) {
              getComponent('city').reloadDict() // 执行city的select组件的reloadDict()方法，触发“city”重新加载字典
            }
          },
          valueChangeImmediate: false // 是否在编辑框打开后立即触发一次valueChange方法
        }
      },
      {
        title: '市',
        key: 'city',
        sortable: true,
        search: { disabled: false },
        type: 'select',
        dict: {
          // url() 改成构建url，返回一个url
          url (dict, { form /* 当前的form表单 */, component /* 当前的组件ref */ }) {
            if (form && form.province != null) { // 本数据字典的url是通过前一个select的选项决定的
              return '/linkage/city?province=' + form.province
            }
            return undefined // 返回undefined 将不加载字典
          },
          value: 'id'
        },
        form: {
          component: { props: { dict: { cache: false } } },
          rules: [{ required: true, message: '请选择市' }],
          // 注释同上
          valueChange (key, value, form, { mode, getColumn, component, immediate, getComponent }) {
            if (value) {
              form.county = undefined// 将county的value置空
              const countySelect = getComponent('county')
              if (form && form.province && form.city) {
                countySelect.reloadDict() // 重新加载字典项
              } else {
                countySelect.clearDict() // 清空选项
              }
            }
          }
        }
      },
      {
        title: '区',
        key: 'county',
        sortable: true,
        search: { disabled: false },
        type: 'select',
        dict: {
          value: 'id',
          url (dict, { form, component }) {
            if (form.province != null && form.city != null) {
              return '/linkage/county?province=' + form.province + '&city=' + form.city
            }
            return undefined
          }
        },
        form: {
          component: { props: { dict: { cache: false } } },
          rules: [{ required: true, message: '请选择区' }],
          valueChange (key, value) {
            console.log('您选择了：', value)
          }
        }
      }
    ]
  }
}
