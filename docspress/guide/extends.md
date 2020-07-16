# 自定义扩展
您还可以自定义类型扩展，将自定义类型、自定义表单组件、自定义行展示组件整合为一个模块  

## 开发一个自定义扩展
此处以[demo-extend](https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends/src/demo-extend)
为例来展示如何开发一个自定义扩展    

### 1. 自定义一个表单组件
这个表单组件需要符合`v-model`写法，具体请参考[vue文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model)     
简单来说就是要能通过value属性输入值，并且通过input、change等事件返回改变后的值

<<< @/packages/d2-crud-plus-extends/src/demo-extend/lib/d2p-form-input/index.vue

### 2. 自定义一个行展示组件
>d2-crud-plus舍弃了column.component的行编辑功能，将column.component作为了行展示组件使用

该组件也需要符合`v-model`写法，由于是展示组件，无需发送input和change事件   
但要求能够感知传入的value值的变化   
所以必须通过watch或者computed方式来根据value变化而改变展示结果



<<< @/packages/d2-crud-plus-extends/src/demo-extend/lib/d2p-row-format/index.vue


### 3. 定义字段类型

你也可以直接使用已注册的符合v-model的其他组件组合使用

<<< @/packages/d2-crud-plus-extends/src/demo-extend/types.js


### 4. 打包成组件包

<<< @/packages/d2-crud-plus-extends/src/demo-extend/index.js


### 5. 在项目中安装

```js
import { D2pDemoExtend } from 'd2p-extends' 
Vue.use(D2pDemoExtend)
```
### 6. 使用
[查看效果](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/slot) 
```js
export const crudOptions = {
  columns: [
     {
      title: '自定义组件',
      key: 'demo',
      type: 'demo-extend'
    }, 
  ]
}
```

## d2p-extends（现有自定义扩展）
[d2p-extends](https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends)



## 扩展组件懒加载
内部组件采用()=>import()方式进行引用即可实现组件懒加载


