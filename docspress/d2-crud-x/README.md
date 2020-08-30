# 起步

## 介绍
`d2-crud-x`是一套基于 [Vue.js 2.2.0+](https://cn.vuejs.org/) 和 [Element 2.0.0+](http://element-cn.eleme.io/#/zh-CN) 的表格组件，`d2-crud-x`将 `Element` 的功能进行了封装，并增加了表格的增删改查、数据校验、表格内编辑等常用的功能。大部分功能可根据配置的json实现，大大简化了开发流程。



## 功能
- 继承了 Element 中表格所有功能
- 新增表格数据
- 修改表格数据
- 删除表格数据
- 使用 Element 中的组件渲染表格内容和表单内容
- 表单校验
- 表格内编辑
- 渲染自定义组件

## 安装
使用npm
``` bash
npm i element-ui d2-crud-x -S
```

使用yarn
``` bash
yarn add element-ui d2-crud-x
```

## 使用
在`main.js`中写入以下内容：
``` js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import D2CrudX from 'd2-crud-x'

Vue.use(ElementUI)
Vue.use(D2CrudX,{name:'d2-crud-x})

new Vue({
  el: '#app',
  render: h => h(App)
})
```

之后就可以在项目中使用`d2-crud-x`了。

[搭配d2-crud-plus](http://localhost:8080/d2-crud-plus/guide/quickstart.html#集成到你的项目中)让你开发crud更有效率哦。【推荐】

## 文档

[API](./crud.md)


