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
  mounted () {
    // this.$emit('ready')
  },
  methods: {
    isValueChanged (value) {
      return this.currentValue !== value
    },
    setValue (value) {
      // 在这里对 传入的value值做处理
      this.currentValue = value
      this.onInput(value)
    },
    onInput (value) {
      this.$emit('input', value)
    },
    onChange (value) {
      this.$emit('change', value)
    },
    dispatch (componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  }
}
