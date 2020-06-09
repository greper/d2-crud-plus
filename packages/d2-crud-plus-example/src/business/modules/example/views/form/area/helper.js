export default {
  init: `import Vue from 'vue'
import d2Crud from 'd2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pAreaSelector,  D2pTreeSelector } from 'd2p-extends' // 上传组件支持懒加载
import request from '@/plugin/axios'
// 引入d2Crud
Vue.use(d2Crud)
// 引入d2CrudPlus
Vue.use(d2CrudPlus, { getRemoteDictFunc (url, dict) {
  return request({
    url: url,
    method: 'get'
  }).then(ret => {
    return ret.data
  })
}
})

// 安装扩展插件
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
  `,
  crud: `export const crudOptions = {
  columns: [
    {
      title: '级联式',
      key: 'pca',
      type: 'area-selector',
      form: {
        helper: '级联式，获取到的值为code,点击保存可看到请求的数据中发给服务器的数据为code'
      }
    }, {
      title: '值为名称',
      key: 'pca2',
      type: 'area-selector',
      dict: { value: 'name' },
      form: {
        helper: '级联式，获取到的值为name'
      }
    }, {
      title: '多选',
      key: 'pca3',
      type: 'area-multi-selector',
      dict: { value: 'name' },
      form: {
        component: { span: 24 },
        helper: '级联式多选，精简结果，collapse-tags'
      }
    }, {
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
    }, {
      title: '树形选择',
      key: 'pcaTree',
      type: 'area-tree-selector',
      form: {
        component: { span: 24 },
        helper: '树形，忽略完全选中节点的子节点，精简结果'
      }
    }, {
      title: '树形选择',
      key: 'pcaTree2',
      type: 'area-tree-selector',
      form: {
        component: {
          span: 24,
          props: { ignoreFullCheckedChildren: false, leafOnly: true, includeHalfChecked: false }
        },
        helper: '树形，不忽略完全选中节点的子节点，只需要叶子节点'
      }
    }
  ]
}


`,
  template: `
  `
}
