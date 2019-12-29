## 目录结构
```
packages    
   |-- d2-crud-plus               //基础工程
   |-- d2-crud-plus-example       //示例工程，进入到该目录下，npm run dev 即可运行示例
   |-- d2-crud-plus-extends       //扩展组件，目前包含文件上传组件、地区选择组件、树形选择组件
```
## 运行示例
执行如下命令即可运行示例项目
```shell script
git clone https://github.com/greper/d2-crud-plus.git
cd d2-crud-plus/packages/d2-crud-plus-example
yarn install  //或者npm install
npm run dev
```
如果想要修改d2-crud-plus或者d2-crud-plus-extends后在示例中热加载  
需要安装lerna，执行如下命令
```shell script
npm install lerna -g
git clone https://github.com/greper/d2-crud-plus.git
cd d2-crud-plus
lerna bootstrap
cd d2-crud-plus/packages/d2-crud-plus-example
yarn install  //或者npm install
npm run dev
```

## 准备开始

### 1.安装
```shell
npm i  @d2-project/d2-crud  d2-crud-plus  -S

如果需要slot等d2-crud增强功能，需要用d2-crud-x替换d2-crud【推荐】
npm i  d2-crud-x   d2-crud-plus -S
```
### 2.引入
 ```javascript
import { d2CrudPlus } from 'd2-crud-plus'
import d2Crud from '@d2-projects/d2-crud'
import Vue from 'vue'
import request from '@/plugin/axios'
Vue.use(d2Crud)
Vue.use(d2CrudPlus, {
  getRemoteDictFunc (url) { //获取数据字典的请求方法，不配置此项则无法加载远程数据字典
    return request({
      url: url,
      method: 'get'
    }).then(ret=>{
      return ret.data  //返回字典数组
    })  
  }
})

// 如果需要slot等增强功能，要将d2-crud替换为d2-crud-x【其他与d2-crud一致，推荐】
import d2Crud from 'd2-crud-x'
import Vue from 'vue'
Vue.use(d2Crud)

 ```
## 开发一个crud

更多示例代码   
https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-example/src/business/views   
通常在其中找一个合适的复制，再根据需求修改即可    
也可以根据数据库表以及模版自动生成

### 3.1 crud.js
```javascript
export const crudOptions = {
  columns: [
    {
      title: '日期',
      key: 'createDate',
      sortable: true, 
      type: 'date', //字段类型为时间选择器datepicker,根据类型可自动生成默认配置
      search: {//查询配置，默认启用查询
        disabled: true //【可选】true禁止查询,默认为false
      },
      form: {//form表单的配置
        disabled: true, //禁止添加输入与修改输入【可选】默认false
      }
    },
    {
      title: '状态',
      key: 'status',
      search: {},//启用查询
      type: 'select', //字段类型为选择框
      form: { //配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
        rules: [//【可选】添加和修改时的校验规则，不配置则不校验
          { required: true, message: '请选择状态' }
        ]
      },
      dict: { //数据字典配置
        url: '/api/dicts/StatusEnum' //远程获取数据字典
      }
    },
    {
      title: '地区', 
      key: 'province', 
      search: {},//启用查询
      type: 'select', //字段类型为选择框
      form: {
        rules: [{ required: true, message: '请选择地区' }],
        component: { //添加和修改时form表单的组件
          props: { //配置自定义组件的属性
            filterable: true, //可过滤选择项
            multiple: true, //支持多选
            clearable: true //可清除
          }
        }
      },
      dict: {  //本地数据字典
        data: [
          { value: 'sz', label: '深圳' }, 
          { value: 'gz', label: '广州' }, 
          { value: 'wh', label: '武汉' }, 
          { value: 'sh', label: '上海' }
        ]
      }
    }
  ]
}
``` 
### 3.2 page.vue
大部分页面都一样，通常直接复制即可    
注意：mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud  
```
<template>
  <d2-container>
    <template slot="header">测试页面</template>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" ></crud-search>
    <d2-crud ref="d2Crud"
        :columns="crud.columns"
        :data="crud.list"
        :rowHandle="crud.rowHandle"
        edit-title="修改"
        :add-template="crud.addTemplate"
        :add-rules="crud.addRules"
        :edit-template="crud.editTemplate"
        :edit-rules="crud.editRules"
        :form-options="crud.formOptions"
        :options="crud.options"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange">
      <el-button slot="header" style="margin-bottom: 5px" size="small" type="primary" @click="addRow">新增</el-button>
    </d2-crud>
    <crud-footer ref="footer" slot="footer"
                  :current="crud.page.current"
                  :size="crud.page.size"
                  :total="crud.page.total"
                  @change="handlePaginationChange"
    >
    </crud-footer>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud' //上文的crudOptions配置
import { d2CrudPlus } from 'd2-crud-plus'
import { AddObj, GetList, UpdateObj, DelObj } from './api' //查询添加修改删除的http请求接口
export default {
  name: 'testPage',
  mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
  methods: {
    getCrudOptions () { return crudOptions },
    pageRequest (query) { return GetList(query)},// 数据请求
    addRequest (row) { return AddObj(row) }, // 添加请求
    updateRequest (row) {return UpdateObj(row)},// 修改请求
    delRequest (row) {return DelObj(row.id)}// 删除请求
    ...// 还可以覆盖d2CrudPlus.crud中的方法来实现你的定制化需求
  }
}
</script>
``` 
### 3.3  api.js
实现添删改查请求接口，通常复制，改一下url即可
```javascript
import request from '@/plugin/axios'
export function GetList (query) {
  return request({
    url: '/test/page',
    method: 'get',
    params: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/test/add',
    method: 'post',
    data: obj
  })
}
export function UpdateObj (obj) {
  return request({
    url: '/test/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/test/delete',
    method: 'post',
    params: { id }
  })
}

```  
以下为本案例示例数据
```
 [
    {date: '2016-05-02',status: '0', province: 'sz'},
    {date: '2016-05-04',status: '1',province: 'sh,sz'},
    {date: 2232433534511,status: '1', province: 'gz'},  //支持各种时间类型
    {date: '2016-05-03',status: '2',province: 'wh,gz'}
  ]
```
### 3.4 看看效果    

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/list.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/add.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/edit.png)
