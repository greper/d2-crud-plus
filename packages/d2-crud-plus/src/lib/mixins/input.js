import inputBase from './input-base'
export default {
  mixins: [inputBase],
  watch: {
    value (value) {
      // 父组件收到input事件后会通过v-model改变value参数的值
      // 然后此处会watch到value的改变，发出change事件
      // change事件放在此处发射的好处是，当外部修改value值时，也能够触发form-data-change事件
      this.onChange(value)
      if (this.isValueChanged(value)) {
        return
      }
      // 如果值是被外部改变的，则修改本组件的currentValue
      this.setValue(value)
    }
  },
  created () {
    // 给currentValue设置初始值
    this.setValue(this.value)
  }
}
