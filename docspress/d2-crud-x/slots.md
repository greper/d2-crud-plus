# 插槽

## header

* 说明: 表格顶部插槽
* scope: 无

## body

* 说明: 表格主体自定义插槽，仅当`options.hide===true`时有效
* scope: 无

## footer
* 说明: 表格脚部插槽，在翻页组件的后面插入
* scope: 无


## expandSlot

* 说明: 行展开插槽，仅当配置了`expandRow`时有效
* scope: row

##  {key}Slot

* 说明: 单元格插槽，仅当列配置中 `rowSlot:true`时有效，`{key}`用列配置中的key代替
* scope: row
* 示例： 以下示例演示`avatar`字段在单元格中使用插槽展示
```js
<template>
    <d2-crud-x :columns='columns'>
        <!-- 插槽自定义单元格展示 -->
        <template slot='avatarSlot' slot-scope='scope'>    
            <el-image :src='scope.row.avatar'></el-image>
        </template>
    </d2-crud-x>
</template>
export default {
  data(){
    return {
      columns:[
        {
           title:'头像',
           key:'avatar',
           rowSlot: true //配置启用插槽自定义
        }
      ]
    }
  }
}
```

##  {key}FormSlot

* 说明: 表单字段插槽，仅当字段配置中 `slot:true`时有效，`{key}`用列配置中的key代替
* scope: row
* 示例： 以下示例演示添加表单中`userId`字段使用插槽方式自定义组件
```js
<template>
    <d2-crud-x :addTemplate='addTemplate'>
        <!-- 插槽自定义表单组件 -->
        <template slot='userIdFormSlot' slot-scope='scope'>    
            <el-input v-model='scope.form.userId'/>
        </template>
    </d2-crud-x>
</template>
export default {
  data(){
    return {
      addTemplate:{
        userId:{
          slot:true //配置启用插槽自定义
        }
      }
    }
  }
}
```


##  {key}HelperSlot

* 说明: 表单字段帮助说明插槽，`{key}`用列配置中的key代替
* scope: mode,form



##  rowHandleSlot
* 说明: 操作列插槽，在每一行的操作列按钮的后面插入
* scope: index, row

## PaginationPrefixSlot
* 说明: 翻页组件内插槽
* scope: 无

## FormHeaderSlot

* 说明: 编辑对话框标题内插槽，紧跟在标题后面插入
* scope: mode,form


## FormBodyAppendSlot
* 说明: 编辑表单主体后置插槽
* scope: mode,form

## FormFooterSlot
* 说明: 编辑框脚部插槽，在保存按钮前面插入
* scope: mode,form

::: tip
没有规划好，插槽命名有点过于随意，对强迫症患者表示抱歉
:::