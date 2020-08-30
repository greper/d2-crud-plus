# 配置: index-row

## title

* 说明: indexRow 列名
* 类型: String
* 可选值: 无
* 默认值: 无

## width

* 说明: indexRow 宽度
* 类型: String
* 可选值: 无
* 默认值: 无

## minWidth

* 说明: indexRow 最小宽度，与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列
* 类型: String
* 可选值: 无
* 默认值: 无

## fixed

* 说明: indexRow 是否固定在左侧或者右侧，true 表示固定在左侧
* 类型: String / Boolean
* 可选值: true / left / right
* 默认值: 无

## renderHeader

* 说明: indexRow 标题 Label 区域渲染使用的 Function
* 类型: Function (h, { column, $index })
* 可选值: 无
* 默认值: 无

## resizable

* 说明: indexRow 是否可以通过拖动改变宽度（需要在 options 中设置 border 属性为 true
* 类型: Boolean
* 可选值: 无
* 默认值: true

## align

* 说明: 对齐方式
* 类型: String
* 可选值: left / center / right
* 默认值: left

## headerAlign

* 说明: 表头对齐方式，若不设置该项，则使用表格的对齐方式
* 类型: String
* 可选值: left / center / right
* 默认值: 无

## className

* 说明: indexRow 的 className
* 类型: String
* 可选值: 无
* 默认值: 无

## labelClassName

* 说明: indexRow 标题的自定义类名
* 类型: String
* 可选值: 无
* 默认值: 无
