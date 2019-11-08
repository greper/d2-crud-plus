# d2-crud-plus
基于d2-admin 的 d2-crud 的扩展,简化d2-crud配置，快速开发crud功能。    
示例地址：http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/index   

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/d2-admin@2x.png" width="200"></a>


## 特性
以约定优于配置原则简化d2-crud繁琐的配置，只需要配置column即可。   

### 1. 简化配置 
* addTemplate、editTemplate根据column配置自动生成   
* column用type字段来自动配置component    
* 同时也支持自定义字段类型 
 
### 2. 根据column配置自动生成查询配置
* column中可以配置各个字段是否开启search

### 3. 枚举字典功能  
* 支持本地和远程获取
* 配合select，轻松实现数据存的是value值，需要对应字典的label来展示的需求

### 4. 一些其他组件  
* 国际手机号输入框及校验   
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/phone
* 对象存储文件上传组件
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/uploader

### 5. d2-crud-x,基于d2-crud的修改版，功能与官方d2-crud一致【可选】
见https://github.com/greper/d2-crud/
* 支持隐藏表格，自定义列表展示方式【配置options.hide=true】   
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/hotel/dashboard
* 支持slot编写各个字段的form表单   
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/slot
* 自定义组件支持form-data-change事件  
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/uploader  
上传头像后可以看到获取到事件，并将获取到的md5、size值赋值给form表单的其他字段


## 目录结构
```
packages    
   |-- d2-crud-plus               //基础工程
   |-- d2-crud-plus-example       //示例工程，进入到该目录下，npm run dev 即可运行示例
   |-- d2-crud-plus-extends       //扩展组件，目前仅有文件上传组件
```

## 快速开始
### 1.安装
```shell
npm i  @d2-project/d2-crud  d2-crud-plus  -S

如果需要slot功能，需要用d2-crud-x替换d2-crud
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
  getRemoteDictFunc (url) { //获取数据字典的请求
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


## 文档
### <a id="options-example">1. 配置说明</a>

#### * 简单配置
```javascript
export const crudOptions = {
  columns: [ //字段配置
    {
      title: '地区',  
      key: 'province', 
      type: 'select',
      dict: {url:'/dict/getProvinceList'}
    }
  ]
}
```
#### * 最全配置
```javascript
export const crudOptions = {
  columns: [ //字段配置
    {
      title: '地区',  
      key: 'province', 
      // -----下方的配置都是可选的------
      type: 'select', //字段类型，根据类型可生成该字段的默认配置，下方那么多配置基本可以不用写
      sortable: true, //是否支持排序
      search: {
        disabled: false, //是否禁用该字段的查询，默认false
        component:{}, //查询框组件配置，默认根据form配置生成 
        slot:false //是否启用搜索框的slot插槽,需要d2-crud-x才支持，示例 http://qiniu.veryreader.com/D2CrudPlusExample/#/form/slot
      },
      form: {
        rules: [ // 表单校验规则
          { required: true, message: '请选择地区' }
        ],
        disabled:false, //是否禁用该字段的添加与修改
        addDisabled: false, //是否在添加时禁用该字段
        editDisabled: false, //是否在修改时禁用该字段
        component: { //添加和修改时form表单的组件
          name: 'dict-select', //组件名称
          props: { //组件的参数
            // d2-crud中默认组件的参数需要配置在component下，而自定义组件又要写在props下，经常会搞混
            // d2-crud-plus会将props复制一份到component下，所以参数全部配置在props下即可
            filterable: true, //可过滤选择项[不同组件参数不同]
            multiple: true, //支持多选[不同组件参数不同]
            clearable: true //可清除[不同组件参数不同]
          }
        },
        slot:false //是否启用form编辑框的slot插槽,需要d2-crud-x才支持，示例 http://qiniu.veryreader.com/D2CrudPlusExample/#/form/slot
      },
      valueBuilder (row,key) {
        // 某些组件传入的value值可能是一个复杂对象，而row中的单个属性的值不合适传入
        // 则需要在打开编辑对话框前将row里面多个字段组合成组件需要的value对象
        // 例如：国际手机号(mobileValue为此column的key) 示例 http://qiniu.veryreader.com/D2CrudPlusExample/#/form/phone
        // row.mobileValue = { phoneNumber: row.phone, callingCode: row.code, countryCode: row.country }
      },
      valueResolve (row,key) { 
        // 组件中传回的值也需要分解成row中多个字段的值，用于提交给后台。
        // if (row.mobileValue != null) {
        //  row.phone = row.mobileValue.phoneNumber
        //  row.code = row.mobileValue.callingCode
        //  row.country = row.mobileValue.countryCode
        // } 
      },
      valueChange(key ,value ,form){
        //form表单数据change事件
      },   
      dict: { // 数据字典配置， 供select等组件通过value匹配label
        data: [ // 本地数据字典
          { value: 'sz', label: '深圳' },
           { value: 'gz', label: '广州' }, 
           { value: 'wh', label: '武汉' }, 
           { value: 'sh', label: '上海' }
        ],
        url:'/dict/get'// 若data为空，则通过http请求获取远程数据字典
      },
      rowSlot: false, // 是否启用该cell的slot插槽,需要d2-crud-x才支持，见 http://qiniu.veryreader.com/D2CrudPlusExample/#/form/slot
      formatter (row, column, value, index) {
        // cell 格式化，与d2-crud一致
      }
    }
  ],
  // 下方的配置都是可选的
  formOptions: { // 与d2-crud一致
    labelWidth: '100px',
    labelPosition: 'left',
    saveLoading: false,
    gutter: 20
  },
  searchOptions: {
    disabled: false //是否禁用搜索工具条
  },
  options: { // 与官d2-crud一致
    stripe: true,
    border: true,
    highlightCurrentRow: false
  },
  addTemplate: {}, //根据form配置自动生成
  editTemplate: {}, //根据form配置自动生成
  addRules: {}, //根据form配置自动生成
  editRules: {},//根据form配置自动生成
  list: [], //数据列表
  loading: false, //当前是否loading
  page: { //与d2-crud一致
    current: 1,
    size: 20,
    total: 1
  },
  rowHandle: { 
    //行操作栏，与d2-crud一致，默认配置有修改与删除
  }
}

```

### <a id="column-type">2. 字段类型</a>

配置字段类型可生成column默认配置，减少大部分的column繁琐配置   
用户配置会覆盖默认配置，当需要定制某些部分的时候，只需要单独配置那一项即可
```javascript
export const crudOptions = {
  columns: [ 
    {
      type: 'select'//字段类型
    }
  ]
}
```

#### <a id="type-support">a. 目前支持的类型 </a>
默认支持的类型：  
 https://github.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/utils/util.column.resolve.js

 * select：单选、多选、搜索选择   
 * date：单个日期、日期段
 * datetime：日期时间、日期时间段
 * time：时间选择器
 * phoneNumber：国际手机号输入框+校验
 * cascader: 级联输入框

   
#### <a id="type-custom">b. 自定义字段类型</a>
其实就是事先自定义好column的配置，根据type直接生成默认配置，减轻配置工作量
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
Vue.use(d2CrudPlus)

//添加自定义字段类型
d2CrudPlus.util.columnResolve.addTypes({
  'time2':{
     form: { component: { name: 'el-date-picker' } },
     component: { name: 'date-format', props: { format: 'YYYY-MM-DD' } },
     _handle (column) {
       //  此方法主要将column中某些依赖的用户配置的属性放到默认配置中，比如数据字典的配置
       if (column.dict != null) {
         this.form.component.props.dict = column.dict
         this.component.props.dict = column.dict
       }
     }
  }
})
```

### <a id="type-extend">3. 类型扩展</a>
您还可以自定义类型扩展，将自定义类型、自定义组件整合为一个模块   
https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends

### <a id="dict-out">4. 外部使用数据字典</a>
* 某些时候数据字典需要在crud外部使用
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  data () {
    return {
      dict: { url: '/hotel/roomtype/options' },
      dictData:[]
    }
  },
  created () {
    d2CrudPlus.util.dict.get(this.dict).then((data) => {
        this.dictData = data
    })
  }
}
```
* 清除字典缓存   
远程字典会以url作为key缓存在内存里面  
某些情况下需要清空字典缓存，比如添加修改删除字典项的时候
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
d2CrudPlus.util.dict.clear() //清空所有字典缓存
d2CrudPlus.util.dict.clear(url) //清空单个字典缓存
```



## <a id="d2-crud-x">d2-crud-x文档</a>
d2-crud-x为d2-crud的修改版，用于支持一些新特性   
见https://github.com/greper/d2-crud/   
当要用以下功能时，需要用d2-crud-x替换d2-crud
### <a id="d2-crud-x-slot">1. 字段插槽 slot</a>
字段组件可以随便作   
示例 http://qiniu.veryreader.com/D2CrudPlusExample/#/form/slot
### <a id="d2-crud-x-table-hide">2. 表格隐藏+自定义</a>
某些需求下，数据内容展示方式不一定是表格，但又需要添加修改和删除功能
    
示例：http://qiniu.veryreader.com/D2CrudPlusExample/#/hotel/dashboard
### <a id="d2-crud-x-form-change">3. formDataChange支持自定义组件</a>
1. 官方版formDataChange不支持自定义组件
2. 修复formDataChange获取的值是旧值的bug   
   
示例：http://qiniu.veryreader.com/D2CrudPlusExample/#/form/uploader


