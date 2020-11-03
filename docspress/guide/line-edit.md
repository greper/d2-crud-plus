# 行编辑
因为rowEdit被占用了，所以行编辑统一使用lineEdit命名
## 配置
```js
const crudOptions= {
    options:{
        lineEdit:{ 
            validation:true //启用表单校验，性能会有一点影响
        }
    },
    rowHandle:{
        lineEdit:{}, //行编辑触发按钮
        lineEditSave:{},//行编辑保存按钮
        lineEditCancel:{},//行编辑取消按钮
        edit:{  
            show:false//对话框编辑按钮隐藏掉
        }   
    }
}
```
## 修改index.vue

```html
<template>
//将click的addRow 方法改成 lineEditAdd() ↓ ↓ ↓ ↓ ↓ ↓ ↓
 <el-button v-permission="'shop:shopCategory:add'" size="small" type="primary" @click="lineEditAdd()"><i class="el-icon-plus"/> 新增</el-button>
</template>
<script>
export default{
    addRequest (row) {
      return api.AddObj(row).then(ret => { //改成返回{row}，要带上id
        row.id = ret.data
        return { row: row } //用于更新表格数据
      })
    },
    updateRequest (row) {
      return api.UpdateObj(row).then(ret => { // 改成返回 {row}
        return { row } //用于更新表格数据
      })
    },
}
</script>
