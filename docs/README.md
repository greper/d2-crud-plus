# d2-crud-plus
基于d2-admin 的 d2-crud 的扩展,简化d2-crud配置，快速开发crud功能。    
示例地址：http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/index   

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/d2-admin@2x.png" width="200"></a>



## 1. 简化配置 
* addTemplate、editTemplate根据column配置自动生成   
* 查询表单配置根据column配置自动生成

## 2. 字段类型
* 通过配置字段类型“column.type”来进一步简化配置
* 根据字段类型不同，自动生成不同的表单组件

## 3. 数据字典功能  
* 支持本地和远程获取
* 配合select，轻松实现数据存的是value值，需要对应字典的label来展示的需求

## 4. 扩展组件  
通过扩展自定义字段类型，扩展自定义组件
* [详细说明](https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends)     

目前支持的扩展组件：  
* [国际手机号输入框及校验](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/phone)
* [对象存储文件上传组件](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/uploader)  
* [地区选择组件](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area)
* [树形选择组件](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area)  

## 5. d2-crud-x
基于d2-crud的修改版，功能与官方d2-crud一致【可选】
在官方基础上修复了一些bug，增强了部分功能
见https://github.com/greper/d2-crud/
* 支持隐藏表格，自定义列表展示方式【配置options.hide=true】   
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/hotel/dashboard
* 支持slot编写各个字段的form表单   
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/slot
* 自定义组件支持form-data-change事件（官方是不支持的） 
http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/uploader  
例如：上传头像后可以看到获取到事件，并将获取到的md5、size值赋值给form表单的其他字段
* 修复官方的form-data-change某些情况下获取到的值不是最新的bug
