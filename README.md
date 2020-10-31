
![](http://greper.veryreader.com/extends/banner1.png)


# 【d2-crud-plus】面向配置的crud编程
基于d2-admin 的 d2-crud 的扩展,简化d2-crud配置，快速开发crud功能。   

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/d2-projects/d2-admin/master/docs/image/d2-admin%402x.png" width="200"></a>

## 帮助文档 
%%%%%%%%%%%%%%%%%%%%%%% 帮助文档 ↓%%%%%%%%%%%%%%%%%%%%%%%%%%%%
> 
>GitHub Pages   
>https://greper.github.io/d2-crud-plus/
>
>码云（国内访问推荐 ）  
>http://greper.gitee.io/d2-crud-plus/   
>
>示例演示   
>http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html
>
%%%%%%%%%%%%%%%%%%%%%%% 帮助文档 ↑%%%%%%%%%%%%%%%%%%%%%%%%%%%%
## 特性

1. 简洁至上： 以最少的配置帮助你简化crud开发。
2. 字段类型： 丰富的字段类型，大幅减少代码量。
3. 快： 开发crud，快的不可思议！！！
4. 自定义： 再困难的需求，也能实现。
5. 权限管理： RBAC权限管理示例。
6. 代码生成： 根据数据表生成前后端代码，一气呵成。  

## 面向配置的crud编程
 
### 1. 简单的crud配置
开发过程中主要对crud.js进行代码编写 
```js
export const crudOptions = (vm)=>{ // vm即this
   return {
     columns: [
       {
         title: '日期',
         key: 'createDate',
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
### 2. 一个完全体crud就出来了   

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/list.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/add.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/packages/d2-crud-plus/doc/image/edit.png)

### 3. 现在就去开始吧
* [帮助指南](http://greper.gitee.io/d2-crud-plus/guide/)

* [快速开始](http://greper.gitee.io/d2-crud-plus/guide/quickstart.html)


## 帮助文档 
%%%%%%%%%%%%%%%%%%%%%%% 帮助文档 ↓%%%%%%%%%%%%%%%%%%%%%%%%%%%%
> 
>GitHub Pages   
>https://greper.github.io/d2-crud-plus/
>
>码云（国内访问推荐 ）  
>http://greper.gitee.io/d2-crud-plus/   
>
>示例演示   
>http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html
>
%%%%%%%%%%%%%%%%%%%%%%% 帮助文档 ↑%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  
## 联系作者

[欢迎bug反馈，需求建议，技术交流等（请备注d2-crud-plus）](http://greper.gitee.io/d2-crud-plus/guide/contact.html)

![](http://d2p.file.veryreader.com/greper/contact.png)

