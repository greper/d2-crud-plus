
# 数据字典

配置数据字典之后， type=【select/area-selector/cascader/tree-selector】
这些字段类型就可以通过数据字典获取label及其选项，无需自己写各种各样乱七八糟的options

## 数据字典的配置   
通常配置在column下,然后被分别赋值到component.dict和form.component.dict
```javascript
export const crudOptions = {
  columns: [ //字段配置
    {
      dict:{
        url:'remote/dict/url', // 这里配置远程获取字典数据的请求地址
        data: [], // [Array|Promise]
        // 如果数据无需远程获取，可以直接将字典数组写在这里
        // 或者你还可以配置一个Promise，自定义获取远程字典数据
        value: 'value', // 数据字典中value字段的属性名
        label: 'label', // 数据字典中label字段的属性名
        children: 'children', // 数据字典中children字段的属性名
        isTree: false // 此数据字典是否是树形的，通常用于级联组件、地区选择组件等处
      }   
    }
]}
```

## 外部使用数据字典
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  data () {
    return {
      dict: { url: '/hotel/roomtype/options' },
      dictData:[]
    }
  },
  created () {
    d2CrudPlus.util.dict.get(this.dict).then((data) => {
        this.dictData = data
    })
  }
}
```
## 清除字典缓存   
远程字典会以url作为key缓存在内存里面  
某些情况下需要清空字典缓存，比如添加修改删除字典项的时候
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
d2CrudPlus.util.dict.clear() //清空所有字典缓存
d2CrudPlus.util.dict.clear(url) //清空单个字典缓存
```

