<template>
   <textarea :value="text" @change="doChange" @input="doInput" :style="{width:width,rows:rows}"></textarea>
</template>

<script>
// text-area封装
export default {
  name: 'text-area',
  props: {
    // 值
    value: { type: String, require: false },
    width: { type: String, require: false, default: '100%' },
    rows: { type: Number, require: false, default: 4 }
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
