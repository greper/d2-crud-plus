# 快速上手
## 目录结构
```
packages    
   |-- d2-crud-plus               //基础工程
   |-- d2-crud-plus-example       //示例工程，进入到该目录下，npm run dev 即可运行示例
   |-- d2-crud-plus-extends       //扩展组件，目前包含文件上传组件、地区选择组件、树形选择组件
```
## 运行示例

### 基本示例运行
执行如下命令即可运行示例项目
```shell script
git clone https://github.com/greper/d2-crud-plus.git
cd d2-crud-plus/packages/d2-crud-plus-example
yarn install  //或者npm install
npm run dev
```

### 权限管理示例运行
如果想要运行权限管理示例，执行如下命令
```js
npm run dev:pm
```
注意：权限管理需要先运行后台，请查看[权限管理帮助文档](./permission.md)获取更多信息

### 代码贡献者运行
如果想要修改d2-crud-plus或者d2-crud-plus-extends后在示例中热加载  
需要安装lerna，执行如下命令
```shell script
npm install lerna -g
git clone https://github.com/greper/d2-crud-plus.git
cd d2-crud-plus
lerna link
cd d2-crud-plus/packages/d2-crud-plus-example
yarn install  //或者npm install
npm run dev
```

## 集成到你的d2-admin项目中

在开始着手集成之前，建议您先运行示例项目，在里面[开发一个crud](#开发一个crud)试试

### 1.安装
```shell
使用npm
npm i  @d2-project/d2-crud  -S //如果官方d2-crud此方式安装报错，可以使用yarn安装，或者使用d2-crud-x
npm i  d2-crud-plus  -S

使用yarn
yarn add @d2-projects/d2-crud 
yarn add d2-crud-plus 

如果需要slot功能，需要用d2-crud-x替换d2-crud【推荐使用d2-crud-x，在官方基础上修复了bug】
npm i  d2-crud-x  -S
```
### 2.引入
 ```javascript
import { d2CrudPlus } from 'd2-crud-plus'
import d2Crud from '@d2-projects/d2-crud'
import Vue from 'vue'
import { request } from '@/api/service'
Vue.use(d2Crud)
Vue.use(d2CrudPlus, {
  //获取数据字典的请求方法
  //可在dict中配置getData方法覆盖此全局方法
  getRemoteDictFunc (url,dict) { 
    return request({
      url: url,
      method: 'get'
    }).then(ret=>{
      return ret.data  //返回字典数组
    })  
  },
  commonOption(){ //d2-crud option 全局设置
    return {
       format: {
        page: { // page接口返回的数据结构配置，
          request: { // 请求参数
            current: 'current', //当前
            size: 'size'
          },
          response: { //返回结果
            current: 'current', // 当前页码 ret.data.current
            size: (data) => { return data.size }, // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'records' // 列表数组 ret.data.records
          }
        }
      },
      options: {size:'mini'} //全局配置element组件大小
    }
  }
})

// 如果需要slot等增强功能，要将d2-crud替换为d2-crud-x【其他与d2-crud一致，推荐】
import d2Crud from 'd2-crud-x'
import Vue from 'vue'
Vue.use(d2Crud)
 ```
### 3. 安装扩展插件
如果你还需要文件上传、图片裁剪、富文本、地区选择器、树形选择器、图标选择器等组件   
那么你还需要安装对应的扩展插件。   
```js
import { D2pAreaSelector, D2pFileUploader, D2pIconSelector, D2pTreeSelector, D2pFullEditor, D2pUploader, D2pDemoExtend } from 'd2p-extends' // 组件支持懒加载

// 安装扩展插件
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
Vue.use(D2pIconSelector)
Vue.use(D2pFullEditor)
Vue.use(D2pFileUploader)
Vue.use(D2pDemoExtend)
Vue.use(D2pUploader, {
    ... //文件上传有额外配置
  }
}
```
新插件在不断开发，你可以点击[示例中的插件引入参考](https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus-example/src/business/lib/index.js)
获取更多信息。
### 4. 修改http响应拦截的返回结果
d2-admin中响应拦截器中成功的返回结果是`dataAxios.data`，code和msg是不会丢给下层处理的   
然而有些时候我们需要拿到`code`和`msg`做进一步判断和处理。   
比如直接把msg弹出显示给用户看。   
所以建议按如下修改响应拦截的返回结果，去掉`dataAxios.data`的`.data`，将`dataAxios`完整传递下去。

```js {9,10}
  // 响应拦截
  service.interceptors.response.use(
    response => {
        ...
        // 有 code 代表这是一个后端接口 可以进行进一步的判断
        switch (code) {
          case 0:
            // [ 示例 ] code === 0 代表没有错误
            // return dataAxios.data  //d2-admin的默认返回
            return dataAxios // 去掉.data
          case 'xxx':
            // [ 示例 ] 其它和后台约定的 code
            errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
            break
          default:
            // 不是正确的 code
            errorCreate(`${dataAxios.msg}: ${response.config.url}`)
            break
        }
      }
    },
```
#### 4.1. 我已经改了
::: warning   

修改之后，登录就会出问题，需要在`account.js`中增加如下代码 
:::
```js {3}
   // src/store/modules/d2admin/modules/account.js
   let res = await api.SYS_USER_LOGIN({ username, password })
   res = res.data //增加这一句
``` 

#### 4.2. 我不想改
当然，如果你不想动这块代码，你也可以在安装d2-crud-plus的时候增加如下配置即可正常使用d2-crud-plus   
```js
Vue.use(d2CrudPlus, {
    ...
  commonOption(){ //d2-crud option 全局设置
    return {
      format: {
        response (ret) {
          // 这里默认配置是  return ret.data
          return ret
        }
      }
    }
  }
})
```
::: warning   
示例中所有的请求响应处理均基于`return dataAxios`的修改，当你复制示例中的响应处理代码时，需要记得将`ret.data`改成`ret`。   
:::

## 开发一个crud


通常在[示例代码](https://gitee.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-example/src/business/modules/example/views/form)
中找一个合适的复制，再根据需求修改即可    
也可以根据数据库表以及模版[自动生成](./generate.md)

### 3.1 crud.js
```js
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
::: warning 
请不要修改ref的值
:::
```html
<template>
  <d2-container>
    <template slot="header">测试页面</template>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
    <d2-crud
        ref="d2Crud"
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
        :loading="crud.loading"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange"
    >
      <el-button slot="header" class="d2-mb-5" size="small" type="primary" @click="addRow">新增</el-button>
    </d2-crud>
    <crud-footer ref="footer"
                  :current="crud.page.current"
                  :size="crud.page.size"
                  :total="crud.page.total"
                  @change="handlePaginationChange"
    />
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
实现添删改查请求接口，通常复制，改一下url即可，你也可以自行增加方法，用于业务需求
```javascript
import { request } from '@/api/service'
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
```js
 [
    {date: '2016-05-02',status: '0', province: 'sz'},
    {date: '2016-05-04',status: '1',province: 'sh,sz'},
    {date: 2232433534511,status: '1', province: 'gz'},  //支持各种时间类型
    {date: '2016-05-03',status: '2',province: 'wh,gz'}
  ]
```
### 3.4  添加路由和菜单
如果在示例中添加crud，则在如下文件中添加路由和菜单。   
`packages/d2-crud-plus-example/src/business/modules/example/index.js`

如果是你自己的d2-admin项目，这部分你应该相当清楚了

### 3.5 看看效果    

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/list.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/add.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/edit.png)



