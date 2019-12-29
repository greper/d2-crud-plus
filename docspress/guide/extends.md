# 自定义扩展
您还可以自定义类型扩展，将自定义类型、自定义表单组件、自定义行展示组件整合为一个模块  

## 开发一个自定义扩展
此处以[tree-selector](https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends/src/tree-selector)
为例来展示如何开发一个自定义扩展    

### 1. 自定义一个表单组件
这个表单组件需要符合`v-model`写法，具体请参考[vue文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model)     
简单来说就是要能通过value属性输入值，并且通过input、change等事件返回改变后的值
```html {31,32,38,39,40}
<template>
  <div class="d2p-tree-selector">
   ...
  </div>
</template>
<script>
// 树形选择组件，需要import xx from 'd2p-extends/src'
export default {
  name: 'd2p-tree-selector',
  props: {
    // 值
    value: {
      type: [Number, String, Array, Object]
    },
    ...
  },
  created () {
    // 此处只有创建组件的时候能够获取到输入值，如果组件要重用，那么将无法根据value变化而修改已选节点
    // 最好通过watch或者computed方式来根据value的变化而获得新值
    // 由于d2-crud每次打开编辑对话框都会重新创建组件，这种实现方式也能正常工作
    this.initData() 
  },
  methods: {
    initData () {
      d2CrudPlus.util.dict.get(this.dict).then(ret => {
          ...
          let selected = []
            for (let item of this.value) {
              ...
            }
          //此处通过value获取到了输入值
          this.$set(this, 'selected', selected)
        }
      })
    },
    selectSubmit () {
      ...
      // 此处通过input 和 change事件返回父组件
      this.$emit('input', values)
      this.$emit('change', values)
    },
  }
}
</script>
```

### 2. 定义一个行展示组件
>d2-crud-plus舍弃了component的行编辑功能，将component作为了行展示组件使用

该组件也需要符合`v-model`写法，由于是展示组件，无需发送input和change事件   
但要求能够感知传入的value值的变化   
所以必须通过watch或者computed方式来根据value变化而改变展示结果


tree-selector组件引用了[values-format](https://github.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/components/format/ValuesFormat.vue)
```js
<script>
export default {
  name: 'values-format',
  props: {
    value: {
      require: true
    },
  },
  computed: {
    items () {
      if (this.value == null || this.value === '') {
        return []
      }
      let options = []
      ... // 此处省略根据value构建options ...
      return options
    }
  }
}
</script>
```

### 3. 定义字段类型
```js
import { d2CrudPlus } from 'd2-crud-plus'
// 定义字段类型
const types = {
  'tree-selector': {
    form: { component: { name: 'd2p-tree-selector', props: { } } },
    component: { name: 'values-format', props: {} }
  }
}
function install (Vue) {
  //组件懒加载
  Vue.component('d2p-tree-selector', () => import('./lib/tree-selector'))
  // 将自定义字段类型加入d2CrudPlus中
  d2CrudPlus.util.columnResolve.addTypes(types)
}
export default {
  install
}
```
### 4. 在项目中引入即可使用

```js
import { D2pTreeSelector } from 'd2p-extends/src' // 源码方式引入，上传组件支持懒加载
Vue.use(D2pTreeSelector)
```
### 5. 使用
```js
export const crudOptions = {
  columns: [
     {
      title: '树形选择',
      key: 'tree',
      type: 'tree-selector',
      dict: {url:'', isTree:true}
    }, 
  ]
}

```

## d2p-extends（现有自定义扩展）
[d2p-extends](https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends)



## 扩展组件如何懒加载
通过源码导入的方式即可实现组件懒加载
内部采用()=>import()方式进行引用
```
import {xxx} from 'd2p-extends/src'
```
更多信息请参考此文章 <https://www.jianshu.com/p/306dee896428>