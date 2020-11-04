import * as Api from './api'

export const crudOptions = {
  options: {
    height: '100%'
  },
  rowHandle: {
    width: 150,
    view: {
      thin: true,
      text: null
    },
    edit: {
      thin: true,
      text: null
    },
    remove: {
      thin: true,
      text: null
    }
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
      title: '级联式',
      key: 'pca',
      type: 'area-selector',
      form: {
        helper: '级联式，获取到的值为code'
      }
    },
    {
      title: '值为名称',
      key: 'pca2',
      type: 'area-selector',
      dict: { value: 'name' },
      form: {
        helper: '级联式，获取到的值为name'
      }
    },
    {
      title: '后台返回三个字段',
      key: 'address',
      type: 'area-selector',
      dict: { value: 'name' },
      form: {
        title: '后台三个字段'
      },
      search: { disabled: false, component: { value: [] } },
      valueBuilder (row, col) {
        row.address = [row.province, row.area, row.city]
      },
      valueResolve (form, col) {
        console.log('--------valueResolve-----', form.address)
        if (form.address && form.address.length >= 3) {
          form.province = form.address[0]
          form.area = form.address[1]
          form.city = form.address[2]
        } else {
          form.province = undefined
          form.area = undefined
          form.city = undefined
        }
        delete form.address
      }
    },
    {
      title: '级联式懒加载',
      key: 'pcaLazy',
      type: 'area-selector',
      dict: {
        url: null,
        getData: null,
        getNodes (values) { // 配置行展示远程获取node
          return Api.GetNodesByValues(values)
        }
      },
      form: {
        component: {
          props: {
            elProps: {
              props: {
                lazy: true,
                lazyLoad (node, resolve) { // 懒加载
                  console.log('-----------------node,', node)
                  if (node.level === 0) {
                    Api.GetTreeChildrenByParentId().then(data => {
                      setTimeout(() => {
                        resolve(data)
                      }, 100)
                    })
                    return
                  }
                  Api.GetTreeChildrenByParentId(node.data.code).then(data => {
                    setTimeout(() => {
                      resolve(data)
                    }, 100)
                  })
                }
              }
            }
          }
        }
      }
    },
    {
      title: '多选1',
      key: 'pca3',
      type: 'area-multi-selector',
      dict: { value: 'name' },
      form: {
        component: { span: 24 },
        helper: '级联式多选，精简结果，collapse-tags'
      }
    },
    {
      title: '多选2',
      key: 'pca4',
      type: 'area-multi-selector',
      dict: { value: 'name' },
      form: {
        component: {
          span: 24,
          props: {
            elProps: { // el-cascade的属性配置
              'collapse-tags': false
            }
          }
        },
        helper: '级联式多选，全部显示'
      }
    },

    {
      title: '树形选择1',
      key: 'pcaTree',
      type: 'area-tree-selector',
      form: {
        component: { span: 24, props: { color: 'auto' } },
        helper: '树形，忽略完全选中节点的子节点，精简结果'
      },
      component: { props: { color: 'auto' } } // 自动颜色
    },
    {
      title: '树形选择2',
      key: 'pcaTree2',
      type: 'area-tree-selector',
      width: 200,
      form: {
        component: {
          span: 24,
          props: { ignoreFullCheckedChildren: false, leafOnly: true, includeHalfChecked: false }
        },
        helper: '树形，不忽略完全选中节点的子节点，只需要叶子节点'
      },
      component: { props: { color: 'auto' } } // 自动颜色
    },
    {
      title: '树形选择3',
      key: 'tree3',
      type: 'tree-selector',
      dict: { url: '/area/tree', isTree: true, value: 'id' },
      form: {
        component: {
          span: 24,
          props: { ignoreFullCheckedChildren: false, leafOnly: true, includeHalfChecked: false }
        },
        helper: '自定义获取省市区数据'
      },
      component: { props: { color: 'auto' } } // 自动颜色
    },
    {
      title: '树形单选',
      key: 'tree4',
      type: 'tree-selector',
      search: { disabled: false },
      dict: { url: '/area/tree', isTree: true, value: 'id' },
      form: {
        component: {
          span: 24,
          props: { multiple: false }
        }
      }
    },
    {
      title: '树形懒加载',
      key: 'tree5',
      type: 'tree-selector',
      dict: {
        isTree: true,
        label: 'name',
        value: 'code',
        getNodes (values) { // 配置行展示远程获取nodes
          return Api.GetNodesByValues(values)
        }
      },
      form: {
        component: {
          span: 24,
          props: {
            multiple: false,
            elProps: {
              lazy: true,
              load (node, resolve) { // 懒加载
                if (node.level === 0) {
                  Api.GetTreeChildrenByParentId().then(data => {
                    resolve(data)
                  })
                  return
                }
                Api.GetTreeChildrenByParentId(node.data.code).then(data => {
                  resolve(data)
                })
              }
            }
          }
        }
      }
    }

  ]
}
