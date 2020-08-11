# 快速上手

## 关系
* `d2-crud` : 官方的一个crud框架，使用起来相对繁琐，且已久不维护
* `d2-crud-x` ：fork`d2-crud`改造而来，威力加强版（修复bug，增强功能）
* `d2-crud-plus`: 辅助`d2-crud-x`或`d2-crud`，让它们使用起来更简单
* `d2-crud-plus-example`: 以`d2-admin`为基础的示例工程，可以单独复制此项目作为你的启动项目
* `d2-crud-plus-extends`: 实用的扩展组件（文件上传组件、地区选择组件、树形选择组件等）

理论上可以脱离d2-admin使用在其他项目中

## 目录结构
```
src
  |--packages    
    |-- d2-crud-plus               //基础工程
    |-- d2-crud-plus-example       //示例工程，进入到该目录下，npm run dev 即可运行示例
    |-- d2-crud-plus-extends       //扩展组件，觉得好用的话，也可以在其他项目中使用
    |-- d2-crud-x                  //d2-crud的修改加强版
```

## 运行示例

### 基本示例运行
执行如下命令即可运行示例项目
```shell script
git clone https://github.com/greper/d2-crud-plus.git
cd d2-crud-plus/packages/d2-crud-plus-example
yarn install  #或者npm install
npm run dev
```

```shell script
# 如果您已全局设置使用淘宝镜像（可能淘宝镜像还没来得及同步最新版本）
# 临时使用npmjs registry，即可安装最新版本
yarn add d2-crud-x d2-crud-plus d2p-extends  --registry  http://registry.npmjs.org
#如果install太慢，使用淘宝镜像
yarn install --registry  https://registry.npm.taobao.org
```

### 权限管理示例运行
如果想要运行权限管理示例，执行如下命令
```js
npm run dev:pm
```
注意：权限管理需要先运行后台，请查看[权限管理帮助文档](./permission.md)获取更多信息

### 调试运行
如果想要修改`d2-crud-plus`或者`d2-crud-plus-extends`代码后在示例中热加载  
需要安装`lerna`，执行如下命令
```shell script
npm install lerna -g
git clone https://github.com/greper/d2-crud-plus.git
cd d2-crud-plus
lerna link
cd d2-crud-plus/packages/d2-crud-plus-example
yarn install  #或者npm install
npm run dev
```

## 集成到你的项目中

在开始着手集成之前，建议您先运行示例项目，在里面[开发一个crud](#开发一个crud)试试

### 1.安装
```shell script
#使用npm
# npm i @d2-project/d2-crud:2.0.5  -S 
# 【d2-crud官方已停止维护，推荐使用加强版d2-crud-x】
# 使用d2-crud-x替换d2-crud【在官方基础上修复了bug，功能更强大】
npm i  d2-crud-x  d2-crud-plus d2p-extends -S

#使用yarn
yarn add d2-crud-x d2-crud-plus d2p-extends 

#使用cnpm
cnpm i  d2-crud-x  d2-crud-plus d2p-extends -S

# 如果你已设置默认淘宝仓库，可能淘宝同步不及时
# 如下配置临时切换npmjs仓库，可安装最新版本
npm i  d2-crud-x  d2-crud-plus d2p-extends -S  --registry  http://registry.npmjs.org
yarn add d2-crud-x d2-crud-plus d2p-extends  --registry  http://registry.npmjs.org

```

### 2.引入
 ```javascript
import { d2CrudPlus } from 'd2-crud-plus'
// import d2Crud from '@d2-projects/d2-crud' 【d2-crud官方已停止维护，推荐使用增强版d2-crud-x】
// 推荐将d2-crud替换为d2-crud-x【使用方式基本与d2-crud一致】
import d2CrudX from 'd2-crud-x'
import Vue from 'vue'
import { request } from '@/api/service'  //你项目http请求用的什么就引入什么

Vue.use(d2CrudX,{name:'d2-crud-x'}) //注册名称为d2-crud-x ，不传name则使用d2-crud作为标签名称

Vue.use(d2CrudPlus, {
  //获取数据字典的请求方法
  //可在dict中配置getData方法覆盖此全局方法
  getRemoteDictFunc (url,dict) { 
    return request({ // 用你项目中的http请求
      url: url,
      method: 'get'
    }).then(ret=>{
      return ret.data  //返回字典数组
    })  
  },
  commonOption(){ //d2-crud option 全局设置，可以不用配置
    return {
       format: {
        page: { // page接口返回的数据结构配置，
          request: { // 请求参数
            current: 'current', //当前
            size: 'size'
          },
          response: { //返回结果
            current: 'current', // 当前页码 ret.data.current
            size: 'size', // 每页条数，ret.data.size, 
            //size: (data) => { return data.size }, //你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'records' // 列表数组 ret.data.records
          }
        }
      },
      formOptions: {
        defaultSpan: 12 // 默认的表单 span
      },
      options: {
        height: '100%' // 表格高度100%, 使用toolbar必须设置
      },
      pageOptions: {
        compact: true // 是否紧凑型页面
      },
      viewOptions:{
        disabled: false // 开启查看按钮
      }
    }
  }
})

 ```
[更多关于后台返回数据结构的配置说明](/guide/structure.md)

#### d2-crud-x与d2-crud共同使用
如果你的项目之前已经使用了`官方版d2-crud`  
你可以直接在此基础上使用`d2-crud-x`,并不会破坏以前的功能    
```js
 import d2Crud from '@d2-projects/d2-crud'
 import d2CrudX from 'd2-crud-x'
 Vue.use(d2Crud)
 Vue.use(d2CrudX,{name:'d2-crud-x'}) //修改d2CrudX的标签名称
```

```html
<template>
  <d2-container>
    <!-- 使用d2CrudX加强版 -->
    <d2-crud-x ref="d2Crud"></d2-crud-x>
    
    <!-- 使用官方"弱鸡版" -->
    <d2-crud ref="d2Crud"></d2-crud>
  </d2-container>
</template>
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
    ... //文件上传有额外配置,请看下方链接
  }
}
```
新插件在不断开发，你可以点击[示例中的插件引入参考](https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus-example/src/business/lib/index.js)
获取更多信息。
### 4. 修改http响应拦截的返回结果
如果你是集成到d2-admin，d2-admin中响应拦截器中成功的返回结果是`dataAxios.data`，code和msg是不会丢给下层处理的   
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

### 1. crud.js
```js
export const crudOptions = (vm)=>{ // vm即this
   return {
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
           component: { //添加和修改时form表单的组件，支持任何v-model组件
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
}
``` 
### 2. index.vue
大部分页面都一样，通常直接复制即可    
::: warning 
请不要修改ref的值
:::
```html
<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">测试页面</template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners">

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button-group>
          <el-button size="small" type="primary"  @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>

    </d2-crud-x>
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
    getCrudOptions () { return crudOptions(this) },
    pageRequest (query) { return GetList(query)},// 数据请求
    addRequest (row) { return AddObj(row) }, // 添加请求
    updateRequest (row) {return UpdateObj(row)},// 修改请求
    delRequest (row) {return DelObj(row.id)}// 删除请求
    ...// 还可以覆盖d2CrudPlus.crud中的方法来实现你的定制化需求
  }
}
</script>
``` 
### 3.  api.js
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
### 4.  添加路由和菜单
如果是在example项目中添加新crud，则在如下文件中添加路由和菜单。   
`packages/d2-crud-plus-example/src/business/modules/example/index.js`

如果是你自己的d2-admin项目，这部分你应该相当清楚了

### 5. 看看效果    

![](https://gitee.com/greper/d2-crud-plus/raw/master/packages/d2-crud-plus/doc/image/list.png)

![](https://gitee.com/greper/d2-crud-plus/raw/master/packages/d2-crud-plus/doc/image/add.png)

![](https://gitee.com/greper/d2-crud-plus/raw/master/packages/d2-crud-plus/doc/image/edit.png)



