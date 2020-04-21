# d2-crud-plus
基于d2-admin 的 d2-crud 的扩展,简化d2-crud配置，快速开发crud功能。   
附带常用组件、权限管理以及前后端代码生成等。   
示例地址：http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/index   

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/d2-admin@2x.png" width="200"></a>

## 帮助文档 
> 
>GitHub Pages   
>https://greper.github.io/d2-crud-plus/
>
>码云（国内访问推荐 ）  
>http://greper.gitee.io/d2-crud-plus/   
>
>


## 特性
以约定优于配置原则简化d2-crud繁琐的配置，只需要配置column即可。   

### 1. 简化配置 
* addTemplate、editTemplate根据column配置自动生成   
* column用type字段来自动配置component    
* 同时也支持自定义字段类型 
 
### 2. 根据column配置自动生成查询配置
* column中可以配置各个字段是否开启search

### 3. 数据字典功能  
* 支持本地和远程获取
* 配合select，轻松实现数据存的是value值，需要对应字典的label来展示的需求
* [详细说明](#4-数据字典)  
### 4. 扩展组件  
通过扩展自定义字段类型，支持扩展组件
* [详细说明](https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends)     

目前支持的扩展组件：  
* [国际手机号输入框及校验](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/phone)
* [对象存储文件上传组件](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/uploader)  
* [地区选择组件](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area)
* [树形选择组件](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area)  



### 5. d2-crud-x,基于d2-crud的修改版，功能与官方d2-crud一致【可选】
见https://github.com/greper/d2-crud/
* 支持隐藏表格，自定义列表展示方式【配置options.hide=true】   
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/hotel/dashboard
* 支持slot编写各个字段的form表单   
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/slot
* 自定义组件支持form-data-change事件  
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/uploader  
例如：上传头像后可以看到获取到事件，并将获取到的md5、size值赋值给form表单的其他字段



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

## 快速开始
### 1.安装
```shell
使用npm
npm i  @d2-project/d2-crud  d2-crud-plus  -S

使用yarn
yarn add @d2-projects/d2-crud d2-crud-plus 

如果需要slot功能，需要用d2-crud-x替换d2-crud【推荐使用d2-crud-x，在官方基础上修复了bug】
npm i  d2-crud-x  -S
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

// 如果需要slot功能，要将d2-crud替换为d2-crud-x【其他与d2-crud一致】
import d2Crud from 'd2-crud-x'
import Vue from 'vue'
Vue.use(d2Crud)

 ```
### 3. curd功能

更多示例代码   
https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-example/src/business/views   
通常在其中找一个合适的复制，再根据需求修改即可    
也可以根据数据库表以及模版自动生成

#### 3.1 crud.js
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
        data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
      }
    }
  ]
}
``` 
#### 3.2 page.vue
大部分页面都一样，通常直接复制即可   
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
    <crud-footer ref="footer" 
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
#### 3.3  api.js
实现添删改查请求接口   
以下为本案例示例数据
```
 [
    {date: '2016-05-02',status: '0', province: 'sz'},
    {date: '2016-05-04',status: '1',province: 'sh,sz'},
    {date: 2232433534511,status: '1', province: 'gz'},  //支持各种时间类型
    {date: '2016-05-03',status: '2',province: 'wh,gz'}
  ]
```
### 4. 效果    

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/list.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/add.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/edit.png)


## ChangeLog
* 权限管理功能
* 代码生成功能 

