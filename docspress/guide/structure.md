# 数据结构
## pageRequest
pageRequest请求默认所需要的参数和数据结构如下：   

1. pageRequest请求参数
```js
{
    current:1, // 页码
    size: 20 // 每页记录条数
}
```
2. pageRequest返回所需要数据结构
```js
{
    code:0,
    msg:'',
    data:{
        current:1, //当前页码
        size:20, //每页记录条数
        total: 100, //总记录数
        records:[...] //数据列表
    }
}
```

## 自定义数据结构
如果你后台pageRequest返回的数据结构与以上结构有差异   
那么你可在公共配置里面配置如下数据结构
```js
Vue.use(d2CrudPlus, {
  ...
  commonOption () { // 公共配置
    return {
      format: {
        page: { // page接口返回的数据结构配置
          request:{
            current:'current',
            size: 'size'
          },
          response:{
            current: 'current', // 当前页码 ret.data.current
            size: (data) => { return data.size }, // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'records' // 列表数组 ret.data.records
          }
        }
      },
```

举例：
假如你后端请求参数如下：
```js
{
    pageNo:1,
    pageLimit:20
}
```
返回结构如下：
```js
{
    code:0,
    msg:'',
    data:{
        pageNo:1,
        limit:20,
        total:100,
        list:[...]
    }
}
```
那么你应该按如下配置
```js
Vue.use(d2CrudPlus, {
  ...
  commonOption () { // 公共配置
    return {
      format: {
        page: { // page接口返回的数据结构配置
          request:{
            current:'pageNo',
            size: 'pageLimit'
          },
          response:{
            current: 'pageNo', // 当前页码 ret.data.current
            size: 'limit', // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'list' // 列表数组 ret.data.records
          }
        }
      },
```

这样配置之后，当d2-crud-plus需要records的时候，就会从ret.data.list获取

以上配置不仅可以配置在全局公共配置里面，还可以单独给每个crud.js配置


## 如果你后端返回比较奇葩
如果你后端返回不是标准结构`{code:0,data:{},msg:''}`   


其实所有的http请求，你都是可以自己修改的
```js
export function GetList (query) {
  // 这里修改你的
  query[你的每页条数参数] = query.size
  query[你的页码参数] = query.current
  return request({
    url: '/area/page',
    method: 'get',
    data: query
  }).then(ret=>{
    //在这里改造成crud所需要的结果
    ret.data= ret.data?ret.data:{}
    ret.data.current = 当前页码
    ret.data.size = 当前每页条数
    ret.data.totla = 总记录数
    ret.data.records = 列表数据
    return ret
  })
}
```

或者改这里也可以
```js
pageRequest (query) {
  //修改请求参数，同上
  return GetList(query).then(ret=>{
    //在这里改造成crud所需要的结果
    return ret
  })
}
```

其他如add、update、delete等请求同上

::: warning   
format配置与结果改造同时使用的时候,你要按如下修改
```js
ret.data= ret.data?ret.data:{}
ret.data.pageNo = 当前页码
ret.data.limit = 当前每页条数
ret.data.totla = 总记录数
ret.data.list = 列表数据
```
:::