# 配置: row-handle

`rowHandle:false` 隐藏操作列

## columnHeader

* 说明: 操作列表头文字
* 类型: String
* 可选值: 无
* 默认值: 操作

## width

* 说明: 操作列宽度
* 类型: String
* 可选值: 无
* 默认值: 无

## minWidth

* 说明: 操作列最小宽度
* 类型: String
* 可选值: 无
* 默认值: 无

## fixed

* 说明: 操作列固定列
* 类型: String / Boolean
* 可选值: true / left / right
* 默认值: 无

## align

* 说明: 操作列对齐方式
* 类型: String
* 可选值: left / center / right
* 默认值: left

## renderHeader

* 说明: 操作列 Label 区域渲染使用的 Function
* 类型: Function (h, { column, $index })
* 可选值: 无
* 默认值: 无

## edit

* 说明: 编辑按钮 , 传入`false`不显示
* 类型: Object | Boolean
* 可选值: 无
* 默认值: 无
* 更多见后面：按钮详细配置

## view

* 说明: 查看按钮, 传入`false`不显示
* 类型: Object | Boolean
* 可选值: 无
* 默认值: 无
* 更多见后面：按钮详细配置

## remove

* 说明: 删除按钮, 传入`false`不显示
* 类型: Object | Boolean
* 可选值: 无
* 默认值: 无
* 更多见后面：按钮详细配置

## remove.confirm

* 说明: 是否弹出confirm框
* 类型: Boolean
* 可选值: 无
* 默认值: 无

## remove.confirmTitle

* 说明: 删除confirm框的标题
* 类型: String
* 可选值: 无
* 默认值: 无

## remove.confirmText

* 说明: 删除confirm框的文字
* 类型: String
* 可选值: 无
* 默认值: 无


## custom

* 说明: 自定义按钮
* 类型: Array
* 可选值: 无
* 默认值: 无
* 更多见后面：按钮详细配置
* 示例配置：
```js
custom:[
    {
      ..., //同 edit 
      emit: 'custom-emit' //自定义按钮监听的事件
    }
]
```
还需配置监听，事件参数: `{index,row}`
 ```html
<d2-crud-x  @custom-emit='handleXxx' >
...
</d2-crud-x>
 ```

## 按钮详细配置
以edit为例
```js
edit:{
    thin: false, //瘦模式，thin=true 且 text=null 可以设置方形按钮节省位置 
    text: '编辑', //按钮文字， null= 取消文字
    //text(scope){return 'xx'}, //也可传入一个方法
    title: undefined, //鼠标停留的提示文字
    type: 'warning', // 按钮类型  可选值【primary / success / warning / danger / info / text】
    icon:'icon-edit', //按钮图标
    //icon(scope){return 'xx'}  //也可传入一个方法
    size: 'small', // 按钮大小
    circle: false,//圆形按钮 ，需要thin=true,且text=null
    show:true, // 是否显示按钮
    //show(index,row){return true}// 支持按条件显隐 
    disabled:false, // 是否禁用
    //disabled(index,row){return true} //支持按条件禁用启用 
    order: 1 //排序号，数字小，排前面，默认顺序：查看=1、编辑=2、删除=3、自定义=4
}
```
```js
//仅显示图标，不显示文字
edit:{
   thin: true,
   text: null,
   icon: 'icon-edit'
}
```
