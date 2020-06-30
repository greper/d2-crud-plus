export default {
  props: {
    // 值
    value: {
      required: false
    },
    // 禁用
    disabled: {
      type: [Boolean, Function],
      required: false,
      default: false
    },
    // 只读
    readonly: {
      type: [Boolean, Function],
      required: false,
      default: false
    }
  },
  data () {
    return {
      // 本组件的实际value值
      // 由于value值是props参数，是不允许修改的，需要用别的值存起来
      currentValue: undefined
    }
  },
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
  },
  mounted () {
    this.$emit('ready')
  },
  methods: {
    isValueChanged (value) {
      return this.selectValue === value
    },
    setValue (value) {
      // 在这里对 传入的value值做处理
      this.currentValue = value
    },
    onInput (value) {
      this.$emit('input', value)
    },
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
