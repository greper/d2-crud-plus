<template>

  <el-input
    class="d2p-textarea"
    type="textarea"
    :rows='rows'
    placeholder=""
    :value="currentValue"
    :style="{width:width}"
    :disabled="disabled"
    :readonly="readonly"
    @change="onChange"
    @input="onInput"
    v-bind="_elProps"
  >
  </el-input>
</template>

<script>
// text-area封装
import input from '../../mixins/input'

export default {
  name: 'text-area',
  mixins: [input],
  props: {
    // 宽度，数字后面要带px
    width: { type: String, require: false, default: '100%' },
    // 行数
    rows: { type: Number, require: false, default: 3 }
  },

  data () {
    return {
    }
  },
  computed: {
    _elProps () {
      return {
        ...this.elProps
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
  .d2p-textarea{
    textarea{
      font-family: Arial,"Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",  sans-serif;
    }
  }
</style>
