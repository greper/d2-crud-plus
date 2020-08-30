# 配置: component

## component.name

* 说明: 表单渲染的组件名，[包括但不限于ElementUI的组件](https://element.eleme.cn/#/zh-CN/component/input)
* 类型: String
* 可选值: el-input / dict-select / dict-radio / dict-checkbox 等任何支持v-model的表单组件
* 默认值: 无

## component.show

* 说明: 是否显示此项
* 类型: Boolean | Function 
* 可选值: 无
* 默认值: true
* 可传入一个方法 show(context){ return context.form.xxx == true}


## component.disabled

* 说明: 是否禁用此项
* 类型: Boolean | Function
* 可选值: 无
* 默认值: false
* 可传入一个方法 disabled(context){ return context.form.xxx == true}

## component.readonly

* 说明: 是否禁用此项
* 类型: Boolean | Function
* 可选值: 无
* 默认值: false
* 可传入一个方法 readonly(context){ return context.form.xxx == true}

## component.props 
* 说明: 组件的参数，一般查找目标组件的文档说明，[包括但不限于ElementUI的组件](https://element.eleme.cn/#/zh-CN/component/input)
* 类型: 无
* 可选值: 无
* 默认值: 无

## component.on
* 说明: 组件的事件
* 类型: 无
* 可选值: 无
* 默认值: 无
* 同义参数：`component.events`
* 示例：
```
on:{
    select(event){  // 监听组件的select事件
        console.log('xxx selected')
    }
}
```

## component.scopedSlots
* 说明: 组件的scoped插槽，支持jsx语法
* 类型: 无
* 可选值: 无
* 默认值: 无
* 同义参数：component.slots
* 示例： 
```
scopedSlots: {
  default: (h, scope) => {
    return (<span>{scope.value}</span>)
  }
},
```

## component.children
* 说明: 组件的子元素,用于插入子元素（包括非scoped插槽元素），支持jsx语法
* 类型: 无
* 可选值: 无
* 默认值: 无
* 示例： 
```
children: [
   (h) => {
      return (<i slot='append' class='icon-search'></i>)
   }
],
```


## component.style|class等attrs

* 说明: 其他html属性，会直接传递给组件
* 示例： 
```js
component:{
    style:{width:'100px'}, // 组件的style
    class:{'d2-mr-5',true} // 组件的class
}
```