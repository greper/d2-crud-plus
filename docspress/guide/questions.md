# 常见问题

## 1. 表单组件返回的数据是数组或Object类型，提交到后台之前怎么处理？
可以配置valueResolve(form, col)
```js
column:[
  {
    key:'xxx',
    valueResolve(form, col){
      row.xxx = JSON.stringify(form.xxx) //修改form表单数据
    } 
  }
]
```
或者重写`this.editBefore(row)`、`this.addBefore(row)` 这两个方法，修改row数据


反过来，后台获取到的数据是json字符串，组件是数组，可以配置valueBuilder(row, col)
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

## 2. 省市区选择组件value是数组，后台返回的是省市区三个字段怎么办？
与上一个问题类似
假设后台返回的是三个字段，province、area、city
```js
column:[
  {
    title:'省市区',
    key:'pac',
    type:'area-selector',
    valueBuilder(row, col){
      row.pac=[row.province,row.area,row.city]
    },
    valueResolve(form, col){
      if(form.pac && form.pac.length>=2){
        form.province = form.pac[0]
        form.area=form.pac[1]
        form.city=form.pac[2]
        delete form.pac
      }
    } 
  }
]
```

## 3. 如何在crud.js中拿到this？
修改两处地方即可
```js
// crud.js
export const crudOptions = (vm) => { //这里改成一个Function
  return {
    columns: [
      {
        key:'xxx',
        valueBuilder(row, col){
          // 比如这里就可以用vm.$set等方法啦
        } 
      } 
    ]
  }
}
```
```js
// index.vue
export default {
  ...
  methods: {
    getCrudOptions () {
      return crudOptions(this) //这里调用这个Function，把this传进去
    }
  }
}
```
示例： http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/select

## 4. 怎么动态获取表单组件的配置
```js
let template = this.getEditFormTemplate(columnKey) //获取组件配置
template.component.props.options = [] //动态将选项置空
```
示例： http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/select

## 5. 怎么获取某个字段的数据字典的选项列表？
```js
//获取form表单组件中的字典选项列表
let columnKey = '你的字段key'
let dictData = this.getEditFormTemplate(columnKey).component.props.dict.data;

//通过字典value获取label
let value = '某个字典项的value'
let label = this.getEditFormTemplate(columnKey).component.props.dict.dataMap[value]

//获取行展示组件中的字典选项列表
let columnKey = '你的字段key'
let dictData = this.crud.columnsMap[columnKey].component.props.dict.data;

// 注意：新版本已不支持 this.crud.columnsMap[columnKey].dict 方式获取
// 请使用 this.crud.columnsMap[columnKey].component.props.dict
```
示例： http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/select

## 6. 怎么获取表单各个字段的值？
```js
let value = this.getEditForm().columnKey;
```

## 7. 后台page接口返回的数据跟组件要的不一样怎么办

方案一：
在公共配置里面配置返回参数
```js
// crud.js
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

方案二：
所有的http请求，你都是可以自己修改的
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
    //在这里改造成组件所需要的结果
    ret.data.current = ret.data[你的当前页码属性]
    ret.data.size = ret.data[你的当前每页条数属性]
    ret.data.totla = ret.data[你的总记录数属性]
    ret.data.records = ret.data[你的列表数据属性]
  })
}
```
方案三：
```js
pageRequest (query) {
  //修改请求参数，同上
  return GetList(query).then(ret=>{
    //在这里改造成组件所需要的结果,同上
  })
}
```

其他如add、update、delete等请求同上
