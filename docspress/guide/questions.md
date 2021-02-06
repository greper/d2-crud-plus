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
示例： http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/select

## 3. 怎么动态获取表单组件的配置
```js
let template = this.getEditFormTemplate(columnKey) //获取组件配置
template.component.props.options = [] //动态将选项置空
```
示例： http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/addi

## 4. 怎么获取某个字段的数据字典的选项列表？
```js
// 方式1：
//获取form表单组件中的字典选项列表
let columnKey = '你的字段key'
let dictData = this.getEditFormTemplate(columnKey).component.props.dict.data;

//通过字典value获取label
let value = '某个字典项的value'
let label = this.getEditFormTemplate(columnKey).component.props.dict.dataMap[value]

//获取行展示组件中的字典选项列表
let columnKey = '你的字段key'
let dictData = this.crud.columnsMap[columnKey].component.props.dict.data;
// 注意：以上方式在字典动态变化时可能会无效

// 方式2：推荐，通过component的ref获取
valueChange(key ,value ,form, {getColumn, mode, component, immediate, getComponent })){
 const data = component.getDictData()
 const otherColumnDictData = getComponent('otherColumnKey').getDictData()
}
// 方式3：异步获取
const dict = {url:'xxx'}
d2CrudPlus.util.dict.get(dict).then((data) => {
  const dictData  = data
})


// 注意：新版本已不支持 this.crud.columnsMap[columnKey].dict 方式获取
// 请使用 this.crud.columnsMap[columnKey].component.props.dict
```
示例： http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/select

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

## 8.1 怎么将初始化从created推迟到mounted？
默认`d2CrudPlus`的初始化是在`created`里面开始的。    
但有时候某些参数需要从`mounted`里面才能获取到   
这时候就需要把初始化过程后移

`d2CrudPlus.crud` mixin如下 
```js
curdMixin ={
  created () {
    this._OnCreated()  
  },
  methods: {
    _OnCreated () {//created的时候执行
      this._doStart()
    },
    _doStart () { //crud的初始化方法
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
    this._doStart ()
  },
  methods: {
    _OnCreated () {
      //覆盖为空方法
    },
  }
}
```

## 8.2 怎么将第一次加载数据从created推迟到mounted？
默认`d2CrudPlus`第一次加载数据是在`doLoad`方法中调用`doRefresh`。    
你可以在你的页面中按如下方式改写即可将第一次加载数据推迟到`mounted`
```js
export default {
  mounted(){ //mounted里面调用刷新方法
    this.doRefresh()
  },
  methods: {
    doLoad () {
      //覆盖为空方法
    },
  }
}
```

## 8.3 怎么一打开页面就获取el-table中的数据？
通过`this.getD2CrudTableData()`即可获取`el-table`中的数据     
但是由于从后端请求数据是异步的，直接在`created`或者`mounted`里面去调用的话        
`el-table`可能还没有初始化完成或者数据还未加载完成    
所以需要先将加载数据推迟到`mounted`    
然后在获取数据成功后的`nextTick`中获取`data`    
```js
export default {
  mounted(){ //mounted里面调用刷新方法
    this.doRefresh()
  },
  methods: {
    doLoad () {
      //覆盖为空方法
    },
    async pageRequest (query) {
      const ret = await  GetList(query)
      // 需要等待2次nextTick el-table才能最终完成初始化，此时才能正确获取到data
      this.$nextTick().then(async () => {
        await this.$nextTick()
        const tableData = this.getD2CrudTableData()
        console.log('tableData:', tableData)
      })
      return ret
    },
  }
}
```

## 9. 表格错位怎么办
有两种可能：
1、所有列都设置了宽度，并且总的宽度不够占满一行，就会产生操作列错位，请至少保留一列为自动宽度(建议设置minWidth)
2、动态显隐列或者有表尾合计行时，有可能产生错位，可以按如下方法解决
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


例如：

```js
export default {
  methods: {
    async pageRequest (query) {
      const ret = await  GetList(query)
        // 请至少保证有一列没有设置固定宽度，否则也会有错位问题
        // 修复合计行错位问题
        this.$nextTick(async () => { // 这里要异步执行
            // await this.$nextTick() //如果一次nextTick不行，那就两次
            this.getD2CrudTable().store.scheduleLayout()
        }) // 等待加载完成后触发重排布局
    },
  }
}
```

[错位解决方案演示](http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/column)
看下方合计行


## 10. 怎么给select设置默认选中第一个选项？
```js
form:{
  component: {
    props: {
      //字典加载完成后触发
      onReady ({ component, data }) { //component为dict-select组件ref， data为字典选项数组
        if (component.value == null) {
          component.onInput(data[0].value) //这里触发选中事件
        }
      }
    }
  }
}

```
## 11. 表格滚动条美化
引入css `/d2-crud-plus-example/src/business/style/scroll.scss`

## 12. IE11打不开
请尝试在你项目的vue.config.js中配置：
```js
module.exports = {
  // 解决ie打不开的问题
  transpileDependencies: ['d2p-extends']
}

```

## 13. 动态列显隐
```js
this.crud.columnsMap.xxxx.show =false
this.handleColumnsFilterChanged(this.crud.columns)
```
## 14. 文件还没上传完，用户就点击提交，获取不到这个上传文件值怎么办

需要设置自定义校验
```js
import { D2pFileUploader } from 'd2p-extends'
//给文件上传组件配置如下校验规则即可
form:{ 
    rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
        validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
        message: '还有文件正在上传，请等待上传完成，或删除它'
    }]
}

```
