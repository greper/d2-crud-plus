
# 自定义字段类型

## 添加自定义字段类型
官方提供的不够用，可以通过以下方式添加你自己的字段类型

```javascript
import { d2CrudPlus } from 'd2-crud-plus'
Vue.use(d2CrudPlus)

//添加自定义字段类型,使用type:'time2'，你就可以省略下面的配置
d2CrudPlus.util.columnResolve.addTypes({
  'time2':{ //如果与官方字段类型同名，将会覆盖官方的字段类型
     form: { component: { name: 'el-date-picker' } },
     component: { name: 'date-format', props: { format: 'YYYY-MM-DD' } }
  }
})
```

## 修改官方字段类型配置
获取到官方配置，然后修改它。

如下例子可以将所有的select字段类型的单元格组件支持自动染色
```js
//修改官方字段类型
const selectType = d2CrudPlus.util.columnResolve.getType('select')
selectType.component.props.color='auto'  //修改官方的字段类型，设置为支持自动染色
```
[官方字段类型列表](./types.md)
