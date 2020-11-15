# 介绍
d2-crud-plus 是基于 d2-admin 的 d2-crud 的扩展,旨在简化 d2-crud 配置，快速开发crud功能。   
Github: <https://github.com/greper/d2-crud-plus>    
Gitee: <https://gitee.com/greper/d2-crud-plus>   
示例地址：<http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html>

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/d2-projects/d2-admin/master/docs/image/d2-admin%402x.png" width="200"></a>

## 关系
* `d2-crud` : 官方的一个crud框架，使用起来相对繁琐，且已久不维护
* `d2-crud-x`: fork`d2-crud`改造而来，威力加强版（修复bug，增强功能）
* `d2-crud-plus`: 辅助`d2-crud-x`或`d2-crud`，让它们使用起来更简单
* `d2-crud-plus-example`: 以`d2-admin`为基础的示例工程，可以单独复制此项目作为你的启动项目
* `d2-crud-plus-extends`: 实用的扩展组件（文件上传组件、地区选择组件、树形选择组件等）


## 特性
### 1. 面向配置的crud编程 
* 根据crud配置快速开发crud功能

### 2. 数据字典  
* 支持本地和远程获取
* 配合select，轻松实现数据存的是value值，需要对应字典的label来展示的需求

### 3. 丰富的字段类型
* 通过配置字段类型“column.type”来简化配置
* 根据字段类型不同，自动生成不同的表单组件
* 支持自定义字段类型

### 4. 扩展组件  
通过扩展自定义组件，扩展自定义类型


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

