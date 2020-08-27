# 核心逻辑

## 如何工作
d2CrudPlus是通过 crud页面的混入功能开始工作的   
混入之后，该crud页面将继承d2CrudPlus.curd的方法
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
2.  遍历`crudOptions.columns`
3.  　　－－根据`type`获取默认字段配置
4.  　　－－使用用户的配置覆盖默认配置
5.  　　－－`form`中的配置覆盖`search`的配置生成`字段查询配置`
6.  　　－－`form`中的配置覆盖`addForm`的配置生成`字段添加配置`
7.  　　－－`form`中的配置覆盖`editForm`的配置生成`字段编辑配置`
8.  　　－－`form`中的配置覆盖`view`的配置生成`字段查看配置`（componentType='form'）
10.  处理分组配置
11.  生成最终的`crud配置`，输出日志 crud init `{this.crud}`
12.  触发`doSearch`方法执行`pageRequest`获取数据
