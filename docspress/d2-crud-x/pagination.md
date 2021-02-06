# 配置: pagination
[支持el-pagination的全部参数](https://element.eleme.cn/#/zh-CN/component/pagination)

`pagination:false` 隐藏翻页组件

## currentPage

* 说明: 表格当前页
* 类型: Number
* 可选值: 无
* 默认值: 无

## pageSize

* 说明: 表格每页行数
* 类型: Number
* 可选值: 无
* 默认值: 10

## pagerCount

* 说明: 页码按钮的数量，当总页数超过该值时会折叠
* 类型: Number
* 可选值: 大于等于 5 且小于等于 21 的奇数
* 默认值: 7

## small

* 说明: 是否使用小型分页样式
* 类型: Boolean
* 可选值: 无
* 默认值: false

## background

* 说明: 是否为分页按钮添加背景色
* 类型: Boolean
* 可选值: 无
* 默认值: false

## layout

* 说明: 组件布局，子组件名用逗号分隔
* 类型: String
* 可选值: `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot`
* 默认值: 'prev, pager, next, jumper, ->, total'

## pageSizes

* 说明: 每页显示个数选择器的选项设置
* 类型: Number[]
* 可选值: 无
* 默认值: [10, 20, 30, 40, 50, 100]

## popperClass

* 说明: 每页显示个数选择器的下拉框类名
* 类型: String
* 可选值: 无
* 默认值: 无

## prevText

* 说明: 替代图标显示的上一页文字
* 类型: String
* 可选值: 无
* 默认值: 无

## nextText

* 说明: 替代图标显示的上一页文字
* 类型: String
* 可选值: 无
* 默认值: 无

## disabled

* 说明: 是否禁用
* 类型: Boolean
* 可选值: 无
* 默认值: false
