export const crudOptions = {
  options: {
    height: '100%'
  },
  columns: [
    {
      title: '级联式选择',
      children: [
        {
          title: '级联式',
          key: 'pca',
          type: 'area-selector',
          form: {
            helper: '级联式，获取到的值为code,点击保存可看到请求的数据中发给服务器的数据为code'
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
        }
      ]
    },
    {
      title: '多选',
      key: 'pca3',
      type: 'area-multi-selector',
      dict: { value: 'name' },
      form: {
        component: { span: 24 },
        helper: '级联式多选，精简结果，collapse-tags'
      }
    },
    {
      title: '多选',
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
      title: '树形选择',
      children: [
        {
          title: '树形选择1',
          key: 'pcaTree',
          type: 'area-tree-selector',
          form: {
            component: { span: 24 },
            helper: '树形，忽略完全选中节点的子节点，精简结果'
          }
        },
        {
          title: '树形选择2',
          key: 'pcaTree2',
          type: 'area-tree-selector',
          form: {
            component: {
              span: 24,
              props: { ignoreFullCheckedChildren: false, leafOnly: true, includeHalfChecked: false }
            },
            helper: '树形，不忽略完全选中节点的子节点，只需要叶子节点'
          }
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
          }
        },
        {
          title: '树形单选',
          key: 'tree4',
          type: 'tree-selector',
          dict: { url: '/area/tree', isTree: true, value: 'id' },
          form: {
            component: {
              span: 24,
              props: { multiple: false }
            }
          }
        }
      ]
    }

  ]
}
