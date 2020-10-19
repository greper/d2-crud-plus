
## 在原d2-crud基础上做出如下改进
### 1.支持隐藏表格，自定义列表展示方式
```
配置options.hide=true
<d2-crud-x  ...>
  <template slot="body">自定义列表</template>
</d2-crud-x>
```
### 2.支持字段组件通过插槽自定义【slot】   
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
    <d2-crud-x ...>
      <template slot="slotExampleSlot" slot-scope="scope">
        <el-tag>{{scope.row['slotExample']}}</el-tag>
      </template>
      <template slot="slotExampleFormSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是通过slot自定义的"></el-input>
      </template>
    </d2-crud-x>
  </d2-container>
</template>
```

### 3.自定义组件支持formDataChange事件   
1. 能够在某个字段change后修改form表单的其他值
2. 修复formDataChange获取的值是旧值的bug




## 介绍
[D2-Crud](https://github.com/d2-projects/d2-crud)是一套基于[Vue.js 2.2.0+](https://cn.vuejs.org/)和[Element UI 2.0.0+](http://element-cn.eleme.io/#/zh-CN)的表格组件。`D2-Crud` 将 `Element` 的功能进行了封装，并增加了表格的增删改查、数据校验、表格内编辑等常用的功能。大部分功能可由配置 `json` 实现，在实现并扩展了 `Element` 表格组件功能的同时，降低了开发难度，减少了代码量，大大简化了开发流程。


## 文档和示例
文档：<http://d2-crud-plus.docmirror.cn/d2-crud-plus/d2-crud-x/>   
示例：<http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/>

## 功能
- 继承了 Element 中表格所有功能
- 新增表格数据
- 修改表格数据
- 删除表格数据
- 使用 Element 中的组件渲染表格内容和表单内容
- 表单校验
- 表格内编辑
- 渲染自定义组件
