## 省市区选择组件
示例地址：http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area
###  1. 引入   
```javascript
// 先引入d2-crud,d2-crud-plus
// 参考 https://github.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus-example/src/business/lib/index.js
// 然后引入树形组件和省市区选择组件
import { D2pAreaSelector, D2pTreeSelector } from 'd2p-extends/src' // 源码方式引入，上传组件支持懒加载
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
```
###  2. crud 
```javascript
export const crudOptions = {
  columns: [
    {
      title: '级联式',
      key: 'pca',
      type: 'area-selector',
    },{
      title: '级联式多选',
      key: 'pca3',
      type: 'area-multi-selector',
    }, {
      title: '树形选择',
      key: 'pcaTree',
      type: 'area-tree-selector',
    }
  ]
}
```
###  3. 效果
 http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area
 
###  参数
