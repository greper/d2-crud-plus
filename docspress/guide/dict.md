
# 数据字典

配置数据字典之后， type=【select/area-selector/cascader/tree-selector】
这些字段类型就可以通过数据字典获取label及其选项，无需自己写各种各样乱七八糟的options

## 数据字典的配置   
通常配置在column下,然后被分别赋值到component.dict和form.component.dict
```javascript
export const crudOptions = {
  columns: [ //字段配置
    {
      dict:{
        // 这里配置远程获取字典数据的请求地址
        url:'remote/dict/url', 
        // 或者配置一个方法，动态构建url
        url: (dict,{form,component})=>{ 
          return 'newUrl'
        }, 
        data: [//[Array]，如果数据无需远程获取，可以直接将字典数组写在这里
           {
            value:1,
            label:'开启', 
            color:'primary', //颜色 【primary，success，danger，warning，info】
            disabled:false //是否禁用
            }
        ], 
        getData:(url,dict,{form,component})=>{ //配置此参数会覆盖全局的getRemoteDictFunc
          return request().then(ret=>{return ret.data})
        },
        cache:true, //默认开启缓存
        value: 'value', // 数据字典中value字段的属性名
        label: 'label', // 数据字典中label字段的属性名
        children: 'children', // 数据字典中children字段的属性名
        isTree: false, // 此数据字典是否是树形的，通常用于级联组件、地区选择组件等处
        clone: false, // 是否在获取到字典数据之后clone一份,clone之后不影响全局缓存，可以随意修改
        onReady(data, dict, context){
          //远程数据字典加载完成事件，每个引用该字典的组件都会触发一次
        }   
      }   
    }
]}
```
注意：dict会以url作为缓存key，使得该字典只会远程获取一次。
```js
dict:{
    cache:false //可以禁用缓存
}
```
    
注意： `url()` ,`getData()` 这两者都会覆盖全局的getRemoteDictFunc   
区别是：
* `getData()` ：如果配置相同的url，即便getData不一样，还是会获取到相同的字典数据，可以通过url单独清理缓存   
* `url()`： 将不会进行缓存

## 页面中获取数据字典
```js
this.getDictData(dict).then(data=>{
  this.dictData = data 
})

// 还可以传入列的key,根据该列的dict配置来获取字典数据
this.getDictData('columnKey').then(data=>{
  this.dictData = data 
})

// 返回map
this.getDictData('columnKey',{returnType:'dataMap'}).then(dataMap=>{
  this.dictDataMap = dataMap 
})
        
```

## 清除字典缓存   
远程字典会以url作为key缓存在内存里面  
某些情况下需要清空字典缓存，比如添加修改删除字典项的时候
```javascript
import { d2CrudPlus } from 'd2-crud-plus'
d2CrudPlus.util.dict.clear() //清空所有字典缓存
d2CrudPlus.util.dict.clear(url) //清空单个字典缓存
```

## onReady事件监听
当dict获取到远程数据之后，会触发onReady事件
```js
dict:{
  onReady: (data, dict,{form,component}) => {
      let value = vm.getEditForm().checkbox
      if (value == null) {
        value = []
      }
      radioOptionsChanged(vm, value)
  }
}
``` 

## 如何设置行展示组件【values-format】的颜色
方法1
获取的字典数据中，带上color即可，可选值【primary,success,danger,warning,info】
`data:[{value:xx,label:xx,color:'success'}]`

方法2
如果后台不方便返回color，可以给字段配置自动染色
` columns:[{component:{props:{color:'auto'}}}]`

方法3
或者手动设置
```
dict:{
 getData:(url,dict,{form,component})=>{ //配置此参数会覆盖全局的getRemoteDictFunc
          return request(url).then(ret=>{
                    //修改颜色值
                    return ret.data
           })
  }
}
```
