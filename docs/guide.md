
## 字段类型

配置字段类型可生成column默认配置，减少大部分的column繁琐配置   
用户配置会覆盖默认配置，当需要定制某些部分的时候，只需要单独配置那一项即可   

例如 type='select'
```javascript
export const crudOptions = {
  columns: [ 
    {
      name: 'foo',
      key: 'foo',
      type: 'select'//字段类型
    }
  ]
}
```
将会根据type，生成如下配置
```javascript
export const crudOptions = {
  columns: [ 
    {
      name: 'foo',
      key: 'foo',
      type: 'select',//字段类型
      search: { 
        component: {
            dict:{ }, 
            props: { clearable: true } //查询框可以清除掉选择项
        } 
      },
      form: { 
        component: { //添加和修改表单组件的配置
          name: 'dict-select',
          dict: {}, 
          props: {} 
        } 
      },
      component: { //行显示组件配置
        name: 'values-format',
        dict: {},
        props: {}
      }
    }
  ]
}
```

最终转化成d2-crud的最终配置
```javascript
export const crudOptions = {
  columns: [ 
    {
      name: 'foo',
      key: 'foo',
      type: 'select',//字段类型
      search: { 
        component: {
            dict:{ }, 
            props: { clearable: true } 
        } 
      },
      form: { 
        component: { //表单组件的配置
          name: 'dict-select',
          dict: {}, 
          props: {} 
        } 
      },
      component: { //行显示组件配置
        name: 'values-format',
        dict: {},
        props: {}
      }
    }
  ]
}
```


#### a. 目前支持的类型 
默认支持的类型：  
 https://github.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/utils/util.column.resolve.js

 * select：单选、多选、搜索选择   
 * date：单个日期、日期段
 * datetime：日期时间、日期时间段
 * time：时间选择器
 * phoneNumber：国际手机号输入框+校验
 * cascader: 级联输入框   
更多组件文档请见[字段类型文档](/documents/types.md)   
更多组件示例请见[示例](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area) 


   
## 自定义字段类型
其实就是事先自定义好column的配置，根据type直接生成默认配置，减轻配置工作量
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
Vue.use(d2CrudPlus)

//添加自定义字段类型
d2CrudPlus.util.columnResolve.addTypes({
  'time2':{
     form: { component: { name: 'el-date-picker' } },
     component: { name: 'date-format', props: { format: 'YYYY-MM-DD' } },
     _handle (column) {
       //  此方法主要将column中某些依赖的用户配置的属性放到默认配置中，比如数据字典的配置
       if (column.dict != null) {
         this.form.component.props.dict = column.dict
         this.component.props.dict = column.dict
       }
     }
  }
})
```

## 自定义类型扩展
您还可以自定义类型扩展，将自定义类型、自定义组件整合为一个模块   
https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends

***扩展组件（d2p-extends）如何懒加载***
通过源码导入的方式即可实现组件懒加载（内部采用()=>import()方式进行导入）
```
import {xxx} from 'd2p-extends/src'
```
更多信息请参考此文章 https://www.jianshu.com/p/306dee896428



## 数据字典

配置数据字典之后， type=【select/area-selector/cascader/tree-selector】
这些字段类型就可以通过数据字典获取label及其选项，无需自己写各种各样乱七八糟的options

### 数据字典的配置   
通常配置在column下,然后被分别赋值到component.dict和form.component.dict
```javascript
export const crudOptions = {
  columns: [ //字段配置
    {
      dict:{
        url:'remote/dict/url', // 这里配置远程获取字典数据的请求地址
        data: [], // 如果数据无需远程获取，可以直接将字典数组写在这里，或者你还可以配置一个Promise
        value: 'value', // 数据字典中value字段的属性名
        label: 'label', // 数据字典中label字段的属性名
        children: 'children', // 数据字典中children字段的属性名
        isTree: false // 此数据字典是否是树形的，通常用于级联组件、地区选择组件等处
      }   
    }
]}
```

### 外部使用数据字典
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
### 清除字典缓存   
远程字典会以url作为key缓存在内存里面  
某些情况下需要清空字典缓存，比如添加修改删除字典项的时候
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
d2CrudPlus.util.dict.clear() //清空所有字典缓存
d2CrudPlus.util.dict.clear(url) //清空单个字典缓存
```

