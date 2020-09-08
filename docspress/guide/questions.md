# 常见问题

## 1. 省市区选择组件value是数组，后台返回的是省市区三个字段怎么办？
假设后台返回的是三个字段，province、area、city
```js
column:[
  {
    title:'省市区',
    key:'pac',
    type:'area-selector',
    // 后端获取到数据后，将调用valueBuilder构建pac的value为area-selector组件所需要的格式
    valueBuilder(row, col){
      row.pac=[row.province,row.area,row.city]
    },
    // 点击确认对话框后，将调用valueResolve解析组件的value值为后端所需要的省市区字段
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

## 2. 如何在crud.js中拿到this？
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

## 3. 怎么动态获取表单组件的配置
```js
let template = this.getEditFormTemplate(columnKey) //获取组件配置
template.component.props.options = [] //动态将选项置空
```
示例： http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/addi

## 4. 怎么获取某个字段的数据字典的选项列表？
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

## 5. 怎么获取表单各个字段的值？
```js
let value = this.getEditForm().columnKey;
```

## 6. 操作列的按钮怎么隐藏？
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

## 7. 怎么手动打开编辑框？
```js
this.getD2Crud().showDialog({
    mode: 'edit',
    rowIndex:xxx
})
```
更多[d2-crud-x外部暴露的方法](https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-x/src/mixin/exposeMethods.js)

## 8. 怎么将初始化（或加载数据）从created推迟到mounted？
默认`d2CrudPlus`的初始化是在`created`里面开始的。    
但有时候某些参数需要从`mounted`里面才能获取到   
这时候就需要把初始化过程后移

`d2CrudPlus.crud` mixin如下 
```js
curdMixin ={
  created () {
    this._crudOnCreated()  
  },
  methods: {
    _crudOnCreated () {//created的时候执行
      this._crudStart()
    },
    _crudStart () { //crud的初始化方法
      this.initColumns()
      this.doLoad()
    }
  }
}
```
你可以在你的页面中按如下方式改写即可将初始化推迟到`mounted`
```js
export default {
  mounted(){ //mounted里面调用start
    this._crudStart ()
  },
  methods: {
    _crudOnCreated () {
      //覆盖为空方法
    },
  }
}
```

## 9. 表格错位怎么办
在合适的时机调用如下代码
```js
// 使用setTimeout 验证是否能够起作用
setTimeout(() => {
   this.getD2CrudTable().doLayout()
}, 1000)
// 或者
this.$nextTick(() => {
  this.getD2CrudTable().doLayout()
})
```
如果还不行可以试试下面这个
```js
// 使用setTimeout 验证是否能够起作用
setTimeout(() => {
  this.getD2CrudTable().store.scheduleLayout()
}, 1000)

// 或者
this.$nextTick(() => {
 this.getD2CrudTable().store.scheduleLayout()
})
```

## 10. 怎么给select设置默认选中第一个选项？
```js
form:{
  component: {
    props: {
      onReady ({ component, data }) {
        if (component.value == null) {
          component.onInput(data[0].value)
        }
      }
    }
  }
}

```
