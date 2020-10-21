# 树形选择组件
示例地址：http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/area
##  1. 引入   
```javascript
// 先引入d2-crud,d2-crud-plus
// 参考 https://github.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus-example/src/business/install.js
// 然后引入树形组件
import { D2pTreeSelector } from 'd2p-extends' // 组件支持懒加载
Vue.use(D2pTreeSelector)
```
##  2. crud 
```javascript
export const crudOptions = {
  columns: [
    {
      title: '树形选择',
      key: 'pcaTree',
      type: 'tree-selector',
      dict: {url:'',isTree:true}
    }
  ]
}
```
##  3. 效果
 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/area
 
 
## 4. 参数说明
[参考d2p-tree-selector组件详情](../components/d2p-tree-selector) 

[参考cascade-select组件详情](../components/cascade-select) 

