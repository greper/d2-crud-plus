
# 字段类型

配置字段类型可生成column默认配置，减少大部分的column繁琐配置   
用户配置会覆盖默认配置，当需要定制某些部分的时候，只需要单独配置那一项即可   


## 配置生成过程

#### 1.‘select’类型的默认配置
```js
{  
    select : {
        search: { component: { props: { clearable: true } } },
        form: { component: { name: 'dict-select', props: {} } },
        component: { name: 'values-format', props: {} }
    }
}
```
#### 2.用户的字段配置
其中自定义设置为多选
```javascript
export const crudOptions = {
  columns: [ 
    {
      name: '城市',
      key: 'city',
      type: 'select' ,//字段类型
      form:{ component:{ props: {multiple:true} } }, //用户自定义配置
      dict: { 
        data:[  //select字段类型需要配置数据字典
          {value:'sz',label:'深圳'},
          {value:'bj',label:'北京'} 
        ] 
      } 
    }
  ]
}
```
#### 3.运行时合并配置
运行时，将会根据type生成该类型定义的默认配置，用户自定义配置会覆盖默认配置   
其中dict配置会自动复制到form.component以及component下

```javascript
export const crudOptions = {
  columns: [ 
    {
      name: '城市',
      key: 'city',
      type: 'select',//字段类型
      //以下是根据type生成的默认配置
      form: { // form中的配置将会被复制到addTemplate、editTemplate以及searchOptions中
        component: { //添加和修改表单组件的配置
          name: 'dict-select', //form表单中使用的组件名
          dict: {...}, 
          props: { multiple:true } //此处为用户自定义的配置，会覆盖默认配置
        } 
      },
      component: { //行显示组件配置
        name: 'values-format', //列表行中使用的组件名
        dict: {...},
        props: {}
      }
    }
  ]
}
```
#### 4.转化成d2-crud的最终配置  
d2-crud有哪些配置项，请参考d2-crud文档：<https://d2.pub/zh/doc/d2-crud-v2/>
```javascript
this.crud= {
  columns: [...],
  addRules:{...},
  addTemplate:{...},
  editRules:{...},
  editTemplate:{...},
  formOptions:{...},
  list:[],
  options:{...},
  rowHandle:{...},
  searchOptions:{columns:[...]}
}
```


## 目前支持的类型 

 * select：单选、多选、搜索选择   
 * date：单个日期、日期段
 * datetime：日期时间、日期时间段
 * time：时间选择器
 * phoneNumber：国际手机号输入框+校验
 * cascader: 级联输入框    
  
 以上仅列出部分类型   
[更多类型](./types)  
[更多示例](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area) 


   
## 自定义字段类型
其实就是事先自定义好column的配置，运行时根据type直接生成默认配置，减轻配置工作量
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
Vue.use(d2CrudPlus)

//添加自定义字段类型
d2CrudPlus.util.columnResolve.addTypes({
  'time2':{
     form: { component: { name: 'el-date-picker' } },
     component: { name: 'date-format', props: { format: 'YYYY-MM-DD' } },
     _handle (column) {...}// 此方法将在运行时执行。在自定义配置与默认配置合并之后执行
    
  }
})
```



