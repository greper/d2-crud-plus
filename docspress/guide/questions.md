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
      }
      delete form.pac
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

## 7. 操作列的按钮怎么隐藏？
隐藏按钮
```js
export const crudOptions = {
  rowHandle: {
    remove: false,
    edit: {
      show(index,row){
        return false
      }   
    }
  }
}
```
禁用按钮
```js
export const crudOptions = {
  rowHandle: {
    remove: {
      disabled: true
    },
    edit: {
      disabled(index,row){
        return true
      }
    },
  }
}
```
隐藏操作列
```js
export const crudOptions = {
  rowHandle: false
}
```