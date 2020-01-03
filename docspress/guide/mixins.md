# d2CrudPlus.crud
## 如何工作
d2CrudPlus是通过 crud页面的混入功能开始工作的   
混入之后，该crud页面将继承d2CrudPlus.curd的方法
```html
<template>
...
</template>
<script>
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
}
</script>
```

## 接口方法
以下为d2CrudPlus.crud中的方法，您可以调用或覆盖其中的方法进行自定义
### getEditForm()
获取添加和修改表单的formData
### initColumns()
crudOptions的初始化方法，会在create方法中被调用    
此方法调用后将生成d2-crud所需要的全部配置
### computeCrudHeight()
计算表格的最大高度，在mounted中给表格设置maxHeight，使翻页组件能保持在窗口可见的最底部
### handlePaginationChange(event)
翻页组件change事件触发方法
### handleSearch(searchFormData)
查询按钮点击事件触发方法
### doRefresh()
表格刷新数据
### doLoad()
页面打开后触发，第一次拉取数据
### handleDialogOpen ({ mode, row })
【空方法，可直接覆盖】对话框被打开前调用，用于在打开对话前修改传入表单的数据   
### addRow()
此方法将触发打开添加对话框
### handleRowAdd(row, done)
添加对话框点击提交的处理
### handleRowEdit(row, done)
编辑对话框点击提交的处理
### editBefore(row)
编辑对话框提交到后端前对表单数据进行处理   
默认会调用各个column中配置的_`this.doValueResolve(row)`   
如要覆盖此方法，不要忘记调用`this.doValueResolve(row)`
### addBefore(row)
添加对话框提交到后端前对表单数据进行处理   
默认会调用各个column中配置的`this.doValueResolve(row)`方法   
如要覆盖此方法，不要忘记调用`this.doValueResolve(row)`
### handleDialogCancel(done)
编辑对话框取消的处理
### handleSelectionChange (selection)
【空方法，可直接覆盖】多选事件
### handleCurrentChange(currentRow, oldCurrentRow) 
【空方法，可直接覆盖】单选事件
### handleRowRemove ({ index, row }, done)
删除按钮提交时的处理方法


### addRequest (row)
添加记录的http请求方法，返回Promise，请参考示例自行实现该方法
### editRequest (row)
修改记录的http请求方法，返回Promise，请参考示例自行实现该方法
### delRequest (row)
删除记录的http请求方法，返回Promise，请参考示例自行实现该方法
### pageRequest (page)
查询页面数据的http请求方法，返回Promise，请参考示例自行实现该方法

### addAfter(row)
添加http请求成功后触发，默认会调用`this.doAfterRowChange(row)`刷新表格数据
### editAfter(row)
修改http请求成功后触发，默认会调用`this.doAfterRowChange(row)`刷新表格数据
### delAfter(row)
删除http请求成功后触发，默认会调用`this.doAfterRowChange(row)`刷新表格数据

### doAfterRowChange(row)
表格行数据变动后触发，默认会调用`this.doRefresh()`刷新表格数据

### handleFormDataChange({ key, value })
编辑框表单改变事件   
默认会执行相应的`column.form.valueChange`  
然后调用`this.doFormDataChange({ key, value })`
### doFormDataChange ({ key, value })
【空方法，可直接覆盖】用户自定义的表单改变事件处理


## 注意事项
::: warning 
请不要修改page.vue中ref的值
:::

