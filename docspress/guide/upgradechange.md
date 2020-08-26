# 版本变更说明

## 1.17.x  点号key多级数据支持
* "d2-crud-plus": "^1.17.x"
* "d2-crud-x": "^2.10.x"
* "d2p-extends": "^1.9.x"

### 点号key多级数据支持
不需要扁平化数据了，配置`key:'user.name'` 即可直接支持多级数据

## 1.16.x  自动化测试、操作列按钮排序
* "d2-crud-plus": "^1.16.x"
* "d2-crud-x": "^2.9.x"
* "d2p-extends": "^1.9.7"

### 操作列按钮排序
```js
rowHandler:{
    view:{
        order:1 // 越小越靠前，默认view=1,edit=2,remove=3,custom=4
    }
}
```


### valueBinding参数
```js
component:{
    //如果是非vModel组件，则没有value属性，此处配置参数名，将row[key]绑定给指定prop
    valueBinding:'propName', 
}
```
## 1.15.x  多级数据支持
* "d2-crud-plus": "^1.15.x"
* "d2-crud-x": "^2.8.x"
* "d2p-extends": "^1.9.x"

### 多级数据支持
[数据扁平化配置](./flat-data.md)
```js
records=[{
  user:{name:'小明',gender:1}
}]
```
### show disabled readonly 方法参数
组件的show disabled readonly 属性传入方法时，支持获取form等上下文参数
```js
columns=[
    {
      component:{
        disabled(context){
          return context.form.xxx===0
        }
      }
    }
]
```


## 1.14.x  查看按钮
* "d2-crud-plus": "^1.14.x"
* "d2-crud-x": "^2.7.x"

### 查看按钮
```js
crudOptions={
    viewOptions:{
        disabled: false, // 开启view按钮，默认关闭
        componentType: 'form' //使用哪种组件展示【form=使用表单组件（默认）,row=使用行展示组件】
    },
    rowHandle:{
        view:{} //查看按钮样式配置
    },
    columns:[
       {
         key:'xx',
         title:'xx',
         view:{} //view组件单独配置
       }
    ]
}
```
传入参数配置
```html
<d2-crud-x ref="d2Crud"
           v-bind="_crudProps"
           v-on="_crudListeners"/>

<!-- 或者旧版基础上增加参数 -->
<d2-crud-x :viewTemplate="crud.viewTemplate" /> 


```

## 1.13.x  联动功能优化
* "d2-crud-plus": "^1.13.x"
* "d2-crud-x": "^2.6.x"

### 变更
1. 实验性支持vxe-table   
vxe-table 性能还不错

2. valueChange增强
```js
{
  form: {
      /**
       *  valueChange 功能增强
       *  key
       *  value 当前选择的值
       *  form 当前表单
       *  getColumn 获取字段配置的方法，getColumn(keyName) 返回keyName的字段配置，可以动态修改组件配置
       *  mode 当前模式:【add、edit、search】
       *  component 当前组件的ref
       *  immediate 是否是对话框打开后立即触发的
       *  getComponent 获取组件Ref的方法， getComponent(keyName), 返回组件ref，可以动态调用该组件的方法
       */
      valueChange (key, value, form, { getColumn, mode, component, immediate, getComponent }) {
      },
      valueChangeImmediate: false // 是否在编辑框打开后立即触发一次valueChange方法
  }
}
```


3. dict-x组件支持dict.url变更触发加载字典数据,支持重新加载字典数据
```js
valueChange(key,value,form,{getColumn,component}){
    getColumn('selectKey').component.props.dict.url = '/dict/url' //触发更新字典数据
    component.reloadDict() // 直接触发更新字典数据
    component.clearDict() // 直接清除字典数据及选项
}
```


4. 【break change】 dict.url() 改为返回一个url
dict.url 支持动态构建
```js
{
    dict: {
      // url 传入一个方法时，返回一个url，将会以此url获取字典项
      url (dict, { form , component /* 当前的组件ref */ }) {
        if (form && form.province != null) { 
          return '/linkage/city?province=' + form.province
        }
        return undefined // 返回undefined 将不加载字典
      }
    }
}
```



5. 记住每页条数
用户选择过每页条数后，将会保存在localStorage
```js
const crudOptions = {
    pagination:{ 
        storage: true // true=默认开启， false=关闭，string=保存时的key后缀
    }
}
```



6. 记住列设置
列设置会保存在localStorage
```html
//storage配置同上
<crud-toolbar :storage='true'/>
```


7. d2-crud-x 属性和事件配置简化
```html
<d2-crud-x
    ref="d2Crud"
    v-bind="_crudProps"
    v-on="_crudListeners"
></d2-crud-x>
```

## 1.12.x 新版页面（带toolbar）
* "d2-crud-plus": "^1.12.x"
* "d2-crud-x": "^2.5.x"
* "d2p-extends": "^1.7.x"

本次更新完全向下兼容，[旧版页面](http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/old)  升级后不受影响   
如果旧版本页面需要升级到新版本页面，请点击[新版页面示例]( http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/toolbar)页面的帮助按钮，查看升级方法

