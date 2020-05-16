<template>
   <textarea :value="text" @change="doChange" @input="doInput" class="el-textarea__inner" :style="{width:width}" :rows='rows'></textarea>
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
    rows: { type: Number, require: false, default: 3 }
  },

  data () {
    return {
      text: ''
    }
  },
  computed: {
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
      let val = $event.target.value
      this.$emit('change', val)
    },
    doInput ($event) {
      let val = $event.target.value
      this.$emit('input', val)
    }
  }
}
</script>
<style>
  .el-textarea__inner{
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
