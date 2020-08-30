# 使用指南

## 获取表格当前数据

可以通过 `ref` 拿到表格实时数据。
``` vue
<template>
  <div>
    <d2-crud-x
      ref="d2Crud"
      :columns="columns"
      :data="data"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [],
      data: []
    }
  },
  mounted () {
    console.log(this.$refs.d2Crud.d2CrudData) // 获取表格数据
  }
}
</script>
```
