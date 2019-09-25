
## 在原d2-crud基础上做出如下改进
###1.支持插槽自定义组件【slot】   
* #### crud配置
```
export const crudOptions = {
  columns: [
    {
      title: '插槽示例',
      key: 'slotExample',
      sortable: true,
      search: {
        disabled: false,
         /**
          *启用search的插槽，在<crud-search>下写自定义slot即可
          *插槽name为key+SearchSlot
          *scope.form为当前表单form
          <template slot="[item.key]SearchSlot" slot-scope="scope">
            {{scope.form['key']}}
          </template>
          */
        slot: true 
      },
      form: {
          /**
            *启用编辑对话框的插槽，在<d2-crud>下写自定义slot即可
            *插槽name为key+FormSlot
            *scope.form为当前表单form
            <template slot="[item.key]FormSlot" slot-scope="scope">
            {{scope.form['key']}}
            </template>
            */
        slot: true
      },
      /**
      *启用行内插槽，在<d2-crud>下写自定义slot即可
      *插槽name为key+Slot
      *scope.row为当前行
      <template slot="[item.key]Slot" slot-scope="scope">
      {{scope.row['key']}}
      </template>
      */
      rowSlot: true 
      
    }
  ]
}
```
* ####template
```
<template>
  <d2-container>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" >
      <template slot="slotExampleSearchSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是写在slot上的"></el-input>
      </template>
    </crud-search>
    <d2-crud ...>
      <template slot="slotExampleSlot" slot-scope="scope">
        <el-tag>{{scope.row['slotExample']}}</el-tag>
      </template>
      <template slot="slotExampleFormSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是通过slot自定义的"></el-input>
      </template>
    </d2-crud>
  </d2-container>
</template>
```
###2.支持导出内部的组件，以便外部可以单独使用其中某些组件   
比如：renderCustomComponent、edit、add、dialog等


![](https://raw.githubusercontent.com/d2-projects/d2-crud/master/doc/image/banner.png)

![npm](https://img.shields.io/npm/v/@d2-projects/d2-crud.svg)
![npm](https://img.shields.io/npm/dt/@d2-projects/d2-crud.svg)
![GitHub license](https://img.shields.io/github/license/d2-projects/d2-crud.svg)


## 介绍
[D2-Crud](https://github.com/d2-projects/d2-crud)是一套基于[Vue.js 2.2.0+](https://cn.vuejs.org/)和[Element UI 2.0.0+](http://element-cn.eleme.io/#/zh-CN)的表格组件。`D2-Crud` 将 `Element` 的功能进行了封装，并增加了表格的增删改查、数据校验、表格内编辑等常用的功能。大部分功能可由配置 `json` 实现，在实现并扩展了 `Element` 表格组件功能的同时，降低了开发难度，减少了代码量，大大简化了开发流程。

## 在原d2-crud基础上做出如下改进
###1.支持插槽自定义组件【slot】   
* #### crud配置
```
export const crudOptions = {
  columns: [
    {
      title: '插槽示例',
      key: 'slotExample',
      sortable: true,
      search: {
        disabled: false,
         /**
          *启用search的插槽，在<crud-search>下写自定义slot即可
          *插槽name为key+SearchSlot
          *scope.form为当前表单form
          <template slot="[item.key]SearchSlot" slot-scope="scope">
            {{scope.form['key']}}
          </template>
          */
        slot: true 
      },
      form: {
          /**
            *启用编辑对话框的插槽，在<d2-crud>下写自定义slot即可
            *插槽name为key+FormSlot
            *scope.form为当前表单form
            <template slot="[item.key]FormSlot" slot-scope="scope">
            {{scope.form['key']}}
            </template>
            */
        slot: true
      },
      /**
      *启用行内插槽，在<d2-crud>下写自定义slot即可
      *插槽name为key+Slot
      *scope.row为当前行
      <template slot="[item.key]Slot" slot-scope="scope">
      {{scope.row['key']}}
      </template>
      */
      rowSlot: true 
      
    }
  ]
}
```
* ####template
```
<template>
  <d2-container>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" >
      <template slot="slotExampleSearchSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是写在slot上的"></el-input>
      </template>
    </crud-search>
    <d2-crud ...>
      <template slot="slotExampleSlot" slot-scope="scope">
        <el-tag>{{scope.row['slotExample']}}</el-tag>
      </template>
      <template slot="slotExampleFormSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是通过slot自定义的"></el-input>
      </template>
    </d2-crud>
  </d2-container>
</template>
```
###2.支持导出内部的组件，以便外部可以单独使用其中某些组件   
比如：renderCustomComponent、edit、add、dialog等

## 文档和示例
文档：<https://doc.d2admin.fairyever.com/zh/ecosystem-d2-crud/>   
示例：<https://d2admin.fairyever.com/#/demo/d2-crud/index>

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
npm i element-ui @d2-projects/d2-crud -S
```

使用yarn
``` bash
yarn add element-ui @d2-projects/d2-crud
```

## 在项目中使用
在`index.js`中写入以下内容：
``` js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import D2Crud from '@d2-projects/d2-crud'

Vue.use(ElementUI)
Vue.use(D2Crud)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

之后就可以在项目中使用`D2-Crud`了。
