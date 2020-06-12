<template>
  <el-tag :type="color">您选择了-> {{value}}</el-tag>
</template>
<script>
// 本示例是行展示组件的最简版本
// 如果要对值做一些处理后再展示，请看index-advance.vue版本
export default {
  name: 'd2p-row-format',
  props: {
    // 接收row.xxx的值
    value: {
      type: String,
      required: false
    },
    color: {
      require: false
    }
  }
}
</script>
