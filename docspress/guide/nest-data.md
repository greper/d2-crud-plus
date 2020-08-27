# 多级数据

## 配置点号key即可
当后端返回的数据是多级嵌套结构时
```js
records=[
    {
        user:{name:'小红',gender:0},
        dept:{name:'研发部',id:1}
    }
]
```

## 配置
```js
crudOptions={
  columns:[
    {
      key:'user.gender',
      title:'性别'
    },
    {
      key:'user.name',
      title:'姓名'
    }
]
}
```
