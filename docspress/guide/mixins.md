# 核心逻辑

## 如何工作
`d2CrudPlus`是通过vue的[混入功能](https://cn.vuejs.org/v2/guide/mixins.html)开始工作的(类似`类的继承`)   
混入之后，该页面将继承`d2CrudPlus.crud`的方法，帮助您简化`d2-crud-x`和`d2-crud`的使用
```html
<template>
...
</template>
<script>
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
}
</script>
```


## 简化字段配置

`d2-crud-plus`的首要任务是简化[d2-crud-x的配置](http://greper.gitee.io/d2-crud-plus/d2-crud-x/)

### 1.简化前的配置
下面以仅有一个`status`字段的`crud`举例    
如下是`d2-crud`需要的最终配置，将如下配置传入`d2-crud`即可完成一个`crud`的开发     
这个代码量还是挺大的，很多重复的东西，我们来看看`d2-crud-plus`是如何简化的
```js
this.crudOptions= {
  columns: [ //单元格的配置
    {//配置单元格用values-format显示
      title:'状态',
      key:'status',
      component:{ 
        name: 'values-format',
        props:{dict:{url:'/dict/status'}}
      } 
    } 
  ], 
  addRules:{
    status:[{request:true}]
  },
  addTemplate:{ //添加表单
    status:{ 
      title:'状态', //【与单元格的title重复，可简化】
      compnent:{
        name:'dict-select', //添加时使用选择框
        props:{dict:{url:'/dict/status'}}
      }
    }
  },
  editRules:{
    status:[{request:true}] //与addRules一样【重复，可简化】
  },
  editTemplate:{ //修改表单配置，【跟addTemplate差不多,可简化】
    status:{ 
      title:'状态',
      compnent:{ 
        name:'dict-select', //修改时使用选择框
        props:{dict:{url:'/dict/status'}} // dict跟单元格里配置一样【可简化】
      }
    }
  },
  viewTemplate:{//查看表单配置【跟addTemplate差不多，可简化】
    status:{ 
      title:'状态',
      compnent:{ 
        name:'dict-select', //查看使用选择框
        props:{dict:{url:'/dict/status'}},
        disabled: true //查看时禁用
      }
    }
  },
  searchOptions:{ // d2-crud不包含查询工具条，查询配置是d2-crud-plus的crud-search组件上需要的
    columns:[
      { 
        title:'状态',
        key:'status',
        compnent:{ //查询工具条里面还是使用选择框【跟addTemplate一样,多了个可清除参数，可简化】
          name:'dict-select',
          props:{dict:{url:'/dict/status'},clearable:true},
        }
      }
    ]
  }
}
```

### 2. 简化第一步，从功能角度转到字段角度
上面配置是按功能划分的，字段配置在功能下     
我们转换成按字段划分，功能配置在字段下   
此状态是crudOptions的字段的最全配置
```js
columns:[ 
  {
    title:'状态',
    key:'status',
    search:{component:{...}},//这里放查询配置
    addForm:{component:{...}},//这里放添加表单配置
    editForm:{component:{...}},//这里放编辑表单配置
    view:{component:{...}}, //这里放查询表单配置
    component:{} //这里放单元格组件配置
  } 
]
```

### 3. 简化addForm、editForm、view
addForm、editForm、view这三个大部分情况下都是一样的，可以合并成一个form
```js
columns:[ 
  {
    title:'状态',
    key:'status',
    search:{},//这里放查询配置
    form:{}, //addForm、editForm、view合并成form
    component:{} //这里放单元格配置
  } 
]
```


### 4. 通过字段类型继续简化
字段类型背后代表了一段默认配置，当你配置了type时，你可以省略它代表的这部分默认配置    

查看[字段类型](./column-type.md)更详细的说明
```js
columns:[ 
  {
    title:'状态',
    key:'status',
    type: 'select',
    dict:{url:'/dict/status'}
  } 
]
```

::: tip
你仍然可以单独设置被简化掉的配置    
比如你想让status字段在添加时启用，编辑时禁用，可以使用如下配置
:::
```js
columns:[ 
  {
    title:'状态',
    key:'status',
    type: 'select',
    dict:{url:'/dict/status'},
    editForm:{ //配置编辑时禁用此组件
        component:{
            disabled: true
        }
    }
  } 
]
```

::: warning
由于数组的合并是取并集，所以当添加和编辑的校验规则不相同时，不要配置在`form.rules`里面，需要在`editForm.rules`和`editForm.rules`下分别配置      
 
:::
```
columns:[ 
  {
    title:'姓名',
    key:'name',
    form: {
      helper: '添加和编辑时都必填，编辑时额外校验长度',
      rules: [{ required: true, message: '请输入姓名' }]
    },
    editForm: {
      rules: [{ min: 2, max: 5, message: '姓名长度为2-5' }]
    }
  } 
]
```
```

### 5. 初始化过程

下面是以上简化过程的伪代码

1.  `created()`中开始crud初始化
2.  页面配置`crudOptions`覆盖全局配置`commonOption`
2.  遍历`crudOptions.columns`，[详细过程](./column-type.md)
3.  　　－－根据`type`获取默认字段配置
4.  　　－－使用用户的配置覆盖默认配置
5.  　　－－`search`中的配置覆盖`form`的配置生成`字段查询配置`
6.  　　－－`addForm`中的配置覆盖`form`的配置生成`字段添加配置`
7.  　　－－`editForm`中的配置覆盖`form`的配置生成`字段编辑配置`
8.  　　－－`view`中的配置覆盖`form`的配置生成`字段查看配置`（仅当componentType='form'）
10.  处理分组配置
11.  生成最终的`crud配置`，输出日志 crud init `{crud}`（你可以在此检查生成的配置是否正确）
12.  将`crud配置`传入`d2-crud-x`组件
13.  触发`doSearch`方法执行`pageRequest`获取数据


## 简化其他配置

通过全局配置,可以简化其他配置
```js
Vue.use(d2CrudPlus, {
  commonOption(){ //全局配置
    return {
      ... //每个页面的crudOptions会以此全局配置为基础
    }
  }
})
```

## 简化事件
[d2-crud有哪些事件](../d2-crud-x/events.md)

页面会通过mixins继承`_crudListeners`这个方法。     
这个方法将会把`d2-crud`事件全部配置监听。   
```js
<d2-crud-x
  v-on="_crudListeners" 
  @xxx="handleXxx"  //可以自己配置事件，覆盖_crudListeners里的监听
/>
```


### valueChange
`form-data-change`、`cell-data-change`、`search-data-change`事件还会自动触发每个字段中配置的`valueChange`方法
