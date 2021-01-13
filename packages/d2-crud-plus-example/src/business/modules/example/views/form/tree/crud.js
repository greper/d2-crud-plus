import * as Api from '@/business/modules/example/views/form/area/api'

export const crudOptions = {
  options: {
    height: '100%'
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
      title: '树形多选',
      key: 'tree1',
      type: 'tree-selector',
      dict: { url: '/area/tree', isTree: true, value: 'id' },
      form: {
        component: { span: 24, props: { clearable: true } },
        rules: [{ required: true, message: '请选择' }],
        helper: '树形，忽略完全选中节点的子节点，精简结果'
      }
    },
    {
      title: '树形选择2',
      key: 'tree2',
      type: 'tree-selector',
      dict: { url: '/area/tree', isTree: true, value: 'id' },
      form: {
        component: {
          span: 24,
          props: { ignoreFullCheckedChildren: false, leafOnly: true, includeHalfChecked: false, clearable: true }
        },
        rules: [{ required: true, message: '请选择' }],
        helper: '树形，不忽略完全选中节点的子节点，只需要叶子节点'
      }
    },
    {
      title: '树形单选',
      key: 'tree3',
      type: 'tree-selector',
      dict: { url: '/area/tree', isTree: true, value: 'id' },
      form: {
        component: {
          span: 24,
          props: { multiple: false, clearable: true }
        },
        rules: [{ required: true, message: '请选择' }]
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
        valueChange (value, key) {
          console.log('value chagned:', key, value)
        },
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
