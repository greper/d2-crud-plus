# 介绍
d2-crud-plus 是基于 d2-admin 的 d2-crud 的扩展,旨在简化 d2-crud 配置，快速开发crud功能。   
Github: <https://github.com/greper/d2-crud-plus>    
示例地址：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html>

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/d2-projects/d2-admin/master/docs/image/d2-admin%402x.png" width="200"></a>


## 特性
### 1. 面向配置的crud编程 
* 根据crud配置开发crud功能

### 2. 数据字典功能  
* 支持本地和远程获取
* 配合select，轻松实现数据存的是value值，需要对应字典的label来展示的需求

### 3. 字段类型
* 通过配置字段类型“column.type”来简化配置
* 根据字段类型不同，自动生成不同的表单组件
* 支持自定义字段类型

### 4. 扩展组件  
通过扩展自定义组件，扩展自定义类型

### 5. d2-crud-x
基于d2-crud的修改版，功能与官方d2-crud一致   
在官方基础上修复了一些bug，增强了部分功能【推荐使用d2-crud-x】   
见<https://github.com/greper/d2-crud/>   
* 支持隐藏表格，自定义列表展示方式【配置options.hide=true】     
<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/hotel/dashboard> 
* 支持slot编写各个字段的form表单     
<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/slot> 
* 自定义组件支持form-data-change事件（官方是不支持的）   
<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/uploader>    
例如：上传头像后可以看到获取到事件，并将获取到的md5、size值赋值给form表单的其他字段
* 修复官方的form-data-change某些情况下获取到的值不是最新的bug  
* 支持行展开


## 关系
* `d2-crud` : 官方的一个crud框架，使用起来相对繁琐，且已久不维护
* `d2-crud-x` ：fork`d2-crud`改造而来，威力加强版（修复bug，增强功能）
* `d2-crud-plus`: 辅助`d2-crud-x`或`d2-crud`，让它们使用起来更简单
* `d2-crud-plus-example`: 以`d2-admin`为基础的示例工程，可以单独复制此项目作为你的启动项目
* `d2-crud-plus-extends`: 实用的扩展组件（文件上传组件、地区选择组件、树形选择组件等）


## 请先了解
本项目基于d2-admin 以及 d2-crud   
本文档假设您已熟悉vue、ElementUI 以及 d2-crud的基础知识
### 1. ElementUI
Github: <https://github.com/ElemeFE/element>  
文档：<https://element.eleme.cn/#/zh-CN/component/installation> 
### 2. d2-admin
Github: <https://github.com/d2-projects/d2-admin>  
文档：<https://d2.pub/zh/doc/d2-admin/> 
### 3. d2-crud-x
文档：[d2-crud-x](../d2-crud-x/)

