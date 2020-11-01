# 配置: form-options
[支持el-dialog的参数](https://element.eleme.cn/#/zh-CN/component/dialog)
[支持el-form的参数](https://element.eleme.cn/#/zh-CN/component/form)

## type
* 说明: 表单模式
* 类型: String
* 可选值: 【dialog=对话框，drawer=抽屉模式】
* 默认值: dialog

## labelWidth

* 说明: 表单 label 宽度
* 类型: String
* 可选值: 无
* 默认值: 无

## labelPosition

* 说明: 表单 label 位置
* 类型: String
* 可选值: 无
* 默认值: 无

## saveButtonShow
* 说明: 是否显示保存按钮
* 类型: Boolean
* 可选值: 无
* 默认值: true

## closeOnClickModal

* 说明: 是否点击遮罩层关闭对话框。
* 类型: String
* 可选值: 无
* 默认值: true   

::: warning     
用户在选择文本时，如果划到了对话框外边会误触发对话框关闭，可根据情况酌情关闭此功能
:::

## saveButtonDisabled
* 说明: 是否禁用保存按钮
* 类型: Boolean
* 可选值: 无
* 默认值: false

## saveButtonSize

* 说明: 保存按钮尺寸
* 类型: String
* 可选值: medium / small / mini
* 默认值: 无

## saveButtonType

* 说明: 保存按钮类型
* 类型: String
* 可选值: primary / success / warning / danger / info / text
* 默认值: 无

## saveButtonIcon

* 说明: 保存按钮图标类名
* 类型: String
* 可选值: 无
* 默认值: 无

## saveButtonText

* 说明: 保存按钮文字
* 类型: String
* 可选值: 无
* 默认值: 保存

## saveLoading

* 说明: 保存按钮是否加载中状态
* 类型: Boolean
* 可选值: 无
* 默认值: false

## gutter

* 说明: 表单栅格间隔
* 类型: Number
* 可选值: 无
* 默认值: 0

## draggable

* 说明: 是否可拖拽
* 类型: Boolean
* 可选值: 无
* 默认值: true

## fullscreen

* 说明: 是否支持对话框全屏按钮
* 类型: Boolean
* 可选值: 无
* 默认值: true

## size
* 说明: 抽屉宽度
* 类型: String
* 示例: '50%'
* 默认值: 无
   
## saveRemind
* 说明: 有修改时是否需要提醒保存
* 类型: Boolean,Function
* 默认值: true
也可以传入一个方法自定义确认对话框
```
saveRemind(){
    return this.$confirm('点击右上角的×可以返回继续编辑', '是否保存修改？', {
        confirmButtonText: '保存',
        cancelButtonText: '放弃保存',
        type: 'warning'
      })
}
```

## updateTableDataAfterEdit
* 说明: 添加或修改后是否将数据直接插入表格   
* 类型: Boolean
* 默认值: false
