<template>

  <el-input
    class="d2p-textarea"
    type="textarea"
    :rows='rows'
    placeholder=""
    :value="text"
    :style="{width:width}"
    @change="doChange"
    @input="doInput"
    v-bind="_elProps"
  >
  </el-input>
</template>

<script>
// text-area封装
export default {
  name: 'text-area',
  props: {
    // 值
    value: { type: String, require: false },
    // 宽度，数字后面要带px
    width: { type: String, require: false, default: '100%' },
    // 行数
    rows: { type: Number, require: false, default: 3 },
    disabled: { type: Boolean, require: false, default: false }
  },

  data () {
    return {
      text: ''
    }
  },
  computed: {
    _elProps () {
      return {
        ...this.elProps
      }
    }
  },
  mounted () {
    this.setValue(this.value)
  },
  watch: {
    value: function (newVal, oldVal) {
      if (this.selectValue === newVal) {
        return
      }
      this.setValue(newVal)
    }
  },
  methods: {
    setValue (newVal) {
      this.text = newVal
    },
    handleClick () {
      // this.$emit('input', !this.value)
    },
    doChange ($event) {
      let val = $event
      this.$emit('change', val)
    },
    doInput ($event) {
      let val = $event
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
.d2p-textarea textarea{
  font-size: 14px;
  font-family: Arial,"Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",  sans-serif;
}
</style>
