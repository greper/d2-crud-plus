
# 组件配置
## 组件配置
表单组件、行组件都是通过`render-custom-component`进行动态生成的。   
每个字段的配置中有几处地方可以配置component：
 1. column.form.component = 表单组件配置
 2. column.component = 表格行展示组件配置
 3. column.search.component = 查询表单组件配置
 4. column.view.component = 查看表单组件配置

使用相关组件前，需要通过`Vue.use` 或 `Vue.component`引入组件

## 组件配置项
[d2-crud-x中的组件配置](../d2-crud-x/component.md)
```js
component:{ //添加和修改时form表单的组件
  name: 'dict-select', //表单组件名称，支持任何v-model组件
  props: { //表单组件的参数，具体参数请查看对应的组件文档
    separator:",",//dict-select的组件参数，[不同组件参数不同]
    elProps:{ //dict-select内部封装了el-select
      filterable: true, //可过滤选择项
      multiple: true, //支持多选
      clearable: true, //可清除
    }
  },
  placeholder:'',
  disabled: false, //是否在表单中禁用组件
  // disabled(context){return false}//还可以配置为方法
  readonly: false, //表单组件是否是只读
  // readonly(context){return false} //还可以配置为方法
  show: true, //是否显示该字段，
  // show(context){return false} //还可以配置为方法         
  on:{ //除input change事件外，更多组件事件监听
    select(event){console.log(event)} //监听表单组件的select事件
  },
  scopedSlots:{ //scoped插槽jsx
     default:(h,scope)=>{ //默认的scoped插槽
        return (<div>{scope.data}</div>)
     }
  },
  children:[ //子元素jsx
      (h)=>{return (<div slot="prefix">非scoped插槽</div>)}
  ],
  span: 12, //该字段占据多宽，24为占满一行
  // 组件的其他html属性,会直接传递给组件
  style:{width:'100px'},
  class:{'d2-mr-5':true}
}
```

## 我想要配置组件的某个功能该如何查找文档
下面以`日期选择器禁用今天之前的日期`这个需求为例
### 1. 查看type对应使用的什么组件
日期选择器我们配置的 `type=date`    
所以先去[字段类型列表](./types.html)，查找`type=date`里面用的是什么组件   
在[日期时间选择](./types.html#日期时间选择)这一条中我们找到了`type=date`的配置
```js
date: {
    form: { component: { name: 'el-date-picker' } },
    component: { name: 'date-format', props: { format: 'YYYY-MM-DD' } }
}
```
从这里知道`type=date`使用的`el-date-picker`组件

### 2.查找该组件的文档，确定参数
在[日期时间选择](./types.html#日期时间选择) 拉到下方   
可以看到相关组件的文档链接（如果没有文档链接，请告诉我，我会尽快加上的）
 
![](./images/type-date-picker.jpg)  

点击[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)
跳转到elementUI的文档页面，找到禁用日期相关参数

![](./images/date-picker-1.jpg)

![](./images/date-picker.jpg)

### 3.给component添加参数
```js
export const crudOptions = (vm) => {
  return {
    columns: [
      {
        title: '日期',
        key: 'date',
        type:'date',
        form:{
          component:{
            props:{
              pickerOptions:{
                disabledDate: time => {
                  return time.getTime() < Date.now()
                }
              }
            }
          }
        }
      }
    ]
  }
}
```
