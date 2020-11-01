# 行编辑
因为rowEdit被占用了，所以行编辑统一使用lineEdit命名
## 配置
```js
const crudOptions= {
    options:{
        lineEdit:{ 
            validation:true //是否启用表单校验，性能会有一点影响
        }
    },
    rowHandle:{
        lineEdit:{}, //行编辑触发按钮
        lineEditSave:{},//行编辑保存按钮
        lineEditCancel:{},//行编辑取消按钮
    }
}
```
