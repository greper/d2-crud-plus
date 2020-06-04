# 事件监听

## dialog-open
`@dialog-open="handleDialogOpen"`  
编辑对话框打开事件，可以在此事件中初始化form表单值

## row-edit
 `@row-edit="handleRowEdit"`   
编辑对话框确认按钮点击事件

## row-add
`@row-add="handleRowAdd"`  
添加对话框确认按钮点击事件

## row-remove
` @row-remove="handleRowRemove"`   
删除对话框确认点击事件

## dialog-cancel
`@dialog-cancel="handleDialogCancel"`   
对话框遮罩层点击关闭事件，覆盖此方法，可以去掉遮罩层点击关闭对话框功能。

## form-data-change
`@form-data-change="handleFormDataChange"`   
表单值更新事件

## form-component-ready
`@form-component-ready="handleFormComponentReady"`   
表单组件初始化完成事件（部分组件会发送此事件，例如富文本编辑器）


## 自定义事件监听
当表单组件发送除以上事件之外的事件时,可以通过以下方法监听
```js
let crudOption={
  columns:[ 
    { 
      title : '内容',
      key : 'content',
      type:'editor-quill',
      form: { 
        component:{
          events:{
            'selection-change':({vm,event})=>{
              //监听选择事件
            } 
          }   
        }
      }
    }
  ]
}

```

  
       
        
  
        
