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

## 初始化过程

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

## 暴露的方法
[暴露的方法](./expose.md)

::: warning
注意不要覆盖[d2CrudPlus.crud](https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/mixins/crud.js)中未暴露的方法
:::