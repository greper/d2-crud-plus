# 数据扁平化
::: warning   
有了点号key的支持，就基本不需要配置数据扁平化了   
下面的可以不用看了   
::: 
[点号key支持](./nest-data.md)

### 什么时候需要数据扁平化
当后端返回的数据是多级嵌套结构时，可以开启数据扁平化
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
  format:{
    flatData:{
       disabled:false, //启用数据扁平化
       symbol:'#', //默认使用#号连接， key需要配置成 user#gender
       deleteOnUnFlat: true // 是否在反扁平化后清理扁平化过的痕迹，默认true
    }
  },
  columns:[
    {
      key:'user#gender',
      title:'性别'
    },
    {
      key:'user#name',
      title:'姓名'
    }
]
}
```

## 运行过程
1. pageRequest获取到数据后，会将key配置了#号连接的数据扁平化，将原本嵌套数据，转化为单层数据

```js
records=[
    {
        'user#name':'小红', //配置了#号key的字段会被扁平化
        'user#gender':0,
        user:{name:'小红',gender:0}, //嵌套的数据保持原样
        dept:{name:'研发部',id:1} //没有配置#号连接的key的字段不会扁平化
    }
]
``` 

2. 在点击保存后，扁平化的数据将会恢复原状


