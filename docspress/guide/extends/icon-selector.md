# icon选择组件
示例地址：http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/icon
##  1. 引入   
```javascript
// 先引入d2-crud,d2-crud-plus
// 参考 https://github.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus-example/src/business/lib/index.js
// 然后引入树形组件
import { D2pIconSelector } from 'd2p-extends' // 组件支持懒加载
Vue.use(D2pIconSelector)
```
##  2. crud 
```javascript
export const crudOptions = {
  columns: [
    {
      title: 'icon',
      key: 'icon',
      type: 'icon-selector'
    }
  ]
}
```
##  3. 效果
 http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/icon

## 4. 组件文档
[d2-icon-select](../components/d2p-icon-select.md)
