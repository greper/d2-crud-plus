# slot自定义

## 什么时候你需要slot自定义
* 需求比较复杂，现有的字段类型和组件无法满足你的需求   
* 需求并不通用，没必要写一个自定义扩展   
* 想要将行列展示美化一下
* 想要使用filter
* 合并多个字段到一个格子里面

## form表单slot自定义
当现有的表单组件均无法满足你的需求时，你可以自己写form表单

1.配置`form.slot=true`
```js {6}
let crudOption={
  columns:[ 
    { 
      title : '主题列表',
      key : 'topics',
      form: { slot : true }
    }
  ]
}
```
2. d2-crud 下写你的slot template，slot名称为 `column.key+'FormSlot'`
```html {3}
<template>
    <d2-crud>
        <template slot="topicsFormSlot" slot-scope="scope">
          <el-input class="d2-mb-5" v-for="(item,index) in scope.form.topics" :key="index"   v-model="scope.form.topics[index]" >
            <el-button slot="append" icon="el-icon-remove-outline" v-on:click="removeTopic(index)"></el-button>
          </el-input>
          <el-button v-on:click="addTopic">添加主题</el-button>
        </template>
    </d2-crud>
</template>
<script>
export default {
  methods: {
   addTopic () {
     let form = this.getEditForm() // 通过此方法可以获得formData
     if (form.topics == null || form.topics === '') {
       form.topics = []
     }
     form.topics.push('')
   },
   removeTopic (index) {
     let form = this.getEditForm() // 通过此方法可以获得formData
     form.topics.splice(index, 1)
   }
  }
}
</script>

```

## 行展示组件slot自定义
当行的默认展示不符合你的需求时，或者你想写filter，你可以使用行展示组件slot  
例如你想合并添加时间和修改时间到一个格子里去    
1.配置`rowSlot=true`
```js {7}
let crudOption={
  columns:[ 
    { 
      title : '时间',
      key : 'createData',
      type : 'date',
      rowSlot: true
    }
  ]
}
```
2. d2-crud 下写你的slot template ,slot名称为 `column.key+'Slot'`
```html {2}
<d2-crud>
    <template slot="createDateSlot" slot-scope="scope">
        创建时间：{{scope.row['createDate'] | date_timeline('YYYY-MM-DD HH:mm:ss')}}<br/>
        更新时间：{{scope.row['updateDate'] | date_timeline('YYYY-MM-DD HH:mm:ss')}}<br/>
    </template>
</d2-crud>
```

## search表单组件slot自定义
与form表单类似，slot名称为 `column.key+'SearchSlot'`

## 表单helper的slot自定义
与form表单类似，slot名称为 `column.key+'HelperSlot'`


## slot快捷字段类型
* type = slot           // 开启该字段行和表单的slot
* type = slot-all       // 开启该字段所有的slot
* type = slot-form      // 仅开启该字段表单的slot

[字段类型配置参考](./types-code)

## 演示示例
<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/slot> 
