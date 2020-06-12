<template>
  <el-tag :type="color">{{currentValue}}</el-tag>
</template>
<script>
// 行展示组件进阶版
// 本示例演示要对传入的值做一些改变，然后再展示
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
  },
  data () {
    return {
      currentValue: ''
    }
  },
  watch: {
    value (value) {
      // this.$emit('change', value)
      if (this.currentValue === value) {
        return
      }
      this.setValue(value)
    }
  },
  created () {
    this.setValue(this.value)
  },
  methods: {
    setValue (value) {
      // 在这里对 传入的value值做处理
      this.currentValue = '您点击了->' + this.value
    }
  }
}
</script>
