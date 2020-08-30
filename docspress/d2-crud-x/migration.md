# 从 CRUD 1.x 迁移

## d2-data-change 事件移除
在2.0版本中，你可以使用 `cell-data-change` 事件更加细化的监听表格内编辑的数据变化。   
示例: [:link: Link](https://d2.pub/d2-admin/preview/#/demo/d2-crud/demo23)

## d2Data 属性修改
修改为 `d2CrudData` ，更加语义化。

## 移除 title add-mode add-button 选项，headerButton 插槽修改为 header
2.0版本将header中的插槽完全暴露给用户，因此移除了新增按钮。   
开启新增的方法请参考示例: [:link: Link](https://d2.pub/d2-admin/preview/#/demo/d2-crud/demo16)

## form-template 拆分为 add-template 和 edit-template
add-template示例: [:link: Link](https://d2.pub/d2-admin/preview/#/demo/d2-crud/demo16)   
edit-template示例: [:link: Link](https://d2.pub/d2-admin/preview/#/demo/d2-crud/demo17) 

## pagination 配置修改
2.0取消了纯前端分页，把分页逻辑交给用户，让用户可以更方便的和后端进行数据通讯。   
示例: [:link: Link](https://d2.pub/d2-admin/preview/#/demo/d2-crud/demo29)