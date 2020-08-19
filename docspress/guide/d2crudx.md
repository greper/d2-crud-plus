# d2-crud-x

## 属性参数

### columns 表头数据
```
columns: {
  type: Array,
  required: true
}
``` 
###  loading 表格加载

```
loading: {
  type: Boolean,
  default: false
},
```
 
### loadingOptions  表格加载配置
```
loadingOptions:{
    text:xxx,
    spinner:xxx
    background:xxx
}
```
### options 表格配置
```
options: {
    type: Object,
    default: null
},
```


```


/**
 * @description 索引
 */
indexRow: {
  default: null
},
/**
 * @description 多选
 */
selectionRow: {
  default: null
},
/**
 * @description 行展开
 */
expandRow: {
  default: null
}


```
