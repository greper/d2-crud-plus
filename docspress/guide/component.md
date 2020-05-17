
# 组件配置

表单组件、行组件都是通过`render-custom-component`进行动态生成的。   
每一列的配置中有三处地方可以配置component：
 1. column.form.component = 表单组件配置
 2. column.component = 表格行展示组件配置
 3. column.search.component = 查询表单组件配置

通过component.name 配置组件名称  
通过component.props 配置组件参数  
默认监听input和change事件    
使用相关组件前，需要通过`Vue.use` 或 `Vue.component`引入组件
```js
component:{ 
    name: 'dict-select',//组件的名称
    props: { // 组件的配置，具体有哪些参数请查看相关组件的说明文档
       multiple: true,
       elProps: {...}, // 如果该组件封装了element组件，则此属性下面配置封装组件的配置
       //类似的还有 uploader、cropper等
       uploader:{...} //如果该组件封装了uploader，此属性下配置uploader的配置   
    }
} 
```


