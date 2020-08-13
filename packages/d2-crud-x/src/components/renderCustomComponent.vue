<script>
export default {
  name: 'render-custom-component',
  props: {
    /**
     * @description v-model双向绑定的值
     */
    value: {
      required: true
    },
    /**
     * @description 传入的组件名
     */
    componentName: {
      required: true
    },
    /**
     * @description 传入的自定义参数
     */
    props: {
      default: undefined
    },
    /**
     * 监听组件事件
     */
    events: {
      default: undefined
    },
    on: {
      default: undefined
    },
    /**
     * scoped插槽
     */
    scopedSlots: {
      default: undefined
    },
    slots: {
      default: undefined
    },
    /**
     *  子元素，静态插槽
     **/
    children: {
      default: undefined
    },
    /**
     * 禁用组件
     */
    disabled: {
      default: undefined
    },
    /**
     * 组件只读
     */
    readonly: {
      default: undefined
    }
  },
  render (h) {
    const self = this
    const events = {}
    if (self.events) {
      for (const key in self.events) {
        events[key] = (event) => {
          if (self.events[key]) {
            self.events[key]({ vm: self._self, component: self._self.$refs.target, event: event, props: this.props })
          }
        }
      }
    }
    if (self.on) {
      for (const key in self.on) {
        events[key] = (event) => {
          if (self.on[key]) {
            self.on[key]({ vm: self._self, component: self._self.$refs.target, event: event, props: this.props })
          }
        }
      }
    }
    const scopedSlots = {}
    if (self.scopedSlots) {
      for (const key in self.scopedSlots) {
        scopedSlots[key] = (scope) => {
          return self.scopedSlots[key](h, scope)
        }
      }
    }
    if (self.slots) {
      for (const key in self.slots) {
        scopedSlots[key] = (scope) => {
          return self.slots[key](h, scope)
        }
      }
    }
    const children = []
    if (self.children) {
      for (const func of self.children) {
        children.push(func(h))
      }
    }

    const disabled = self.disabled instanceof Function ? self.disabled() : self.disabled
    const readonly = self.readonly instanceof Function ? self.readonly() : self.readonly
    return h(self.componentName, {
      on: {
        input: function (event) {
          self.$emit('input', event)
        },
        change: function (event) {
          self.$emit('change', { value: event, component: self._self.$refs.target })
        },
        ready: function (event) {
          self.$emit('ready', { value: event, component: self._self.$refs.target })
        },
        ...events
      },
      attrs: self.$attrs,
      scopedSlots: scopedSlots,
      props: {
        value: self.value,
        disabled: disabled,
        readonly: readonly,
        ...self.props
      },
      ref: 'target'
    }, children)
  },
  methods: {
    getComponentRef () {
      return this.$refs.target
    }
  }
}
</script>
