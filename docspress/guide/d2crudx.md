# d2-crud-x

## 修复bug

* 修复formDataChange获取的值是旧值的bug

## 增强功能

### 支持隐藏表格，自定义列表展示方式
[示例](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/hotel/dashboard)

```js
配置options.hide=true
<d2-crud-x  ...>
  <template slot="body">自定义列表</template>
</d2-crud-x>
```
### 支持字段组件通过插槽自定义【slot】  
[示例](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/slot) 
* #### crud配置
```js
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
* #### template
```html
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



### 表单组件事件监听
* form-data-change 
* form-component-ready
* form-component-custom-event

## 功能删减

1. 去除了原版自带的`el-select`、`el-radio`、`el-checkbox`等组件。   
由d2-crud-plus中的`dict-select`、`dict-radio`、`dict-checkbox`代替

2. 去除了默认尺寸设置
```js
Vue.use(d2Crud, { size: 'small' })
```