# 常见问题

## 1. 表单组件返回的数据是数组或Object类型，提交到后台之前怎么处理？
可以配置valueResolve(row, col)
```js
column:[
  {
    key:'xxx',
    valueResolve(row, col){
      row.xxx = JSON.stringify(row.xxx) //修改form表单数据
    } 
  }
]
```
或者重写`this.editBefore(row)`、`this.addBefore(row)` 这两个方法，修改row数据

## 2. form组件的value需要的是数组，后台返回的是string，要怎么处理？
与上一个问题对应,可以配置valueBuilder(row, col)
```js
column:[
  {
    key:'xxx',
    valueBuilder(row, col){
      row.xxx = JSON.parse(row.xxx) //修改行数据，用于行展示组件显示
    } 
  }
]
```


