# 配置: add|edit|view-template

## title

* 说明: 表单 label 的名称
* 类型: String
* 可选值: 无
* 默认值: 无

## value
* 说明: 表单模板的默认值
* 类型: 无
* 可选值: 无
* 默认值: 无

## component.name

* 说明: 表单渲染的组件名，[更多关于component配置](./component.md)
* 类型: String
* 可选值: el-input / dict-select / dict-radio / dict-checkbox 等任何支持v-model的表单组件
* 默认值: 无

## component.show

* 说明: 是否显示此项
* 类型: Boolean | Function 
* 可选值: 无
* 默认值: true
* 支持根据条件显隐 `show(context){ return context.form.xxx == true}`


## component.disabled

* 说明: 是否禁用此项
* 类型: Boolean | Function
* 可选值: 无
* 默认值: false
* 支持根据条件禁用启用 `disabled(context){ return context.form.xxx == true}`

## component.readonly

* 说明: 是否只读
* 类型: Boolean | Function
* 可选值: 无
* 默认值: false
* 支持根据条件只读 `readonly(context){ return context.form.xxx == true}`


## component.render

* 说明: 使用render函数创建组件，支持jsx语法。(component.name优先级更高)
* 类型: Function (h)
* 可选值: 无
* 默认值: 无


## component.span

* 说明: 表单布局所占栅格数，栅格布局请参考 [Layout 布局](http://element-cn.eleme.io/#/zh-CN/component/layout)
* 类型: Number
* 可选值: 无
* 默认值: 无

## component.offset

* 说明: 表单栅格布局偏移量，栅格布局请参考 [Layout 布局](http://element-cn.eleme.io/#/zh-CN/component/layout)
* 类型: Number
* 可选值: 无
* 默认值: 无