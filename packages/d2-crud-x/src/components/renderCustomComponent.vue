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
     * @description 传入的行数据
     */
    scope: {
      default: undefined
    },
    /**
     * 监听组件事件
     */
    events: {
      default: undefined
    },
    /**
     * 插槽
     */
    slots: {
      default: undefined
    },
    /**
     *
     */
    disabled: {
      default: undefined
    },
    readonly: {
      default: undefined
    }
  },
  render (h) {
    const self = this
    const events = {}
    if (self.events) {
      for (let key in self.events) {
        events[key] = (event) => {
          if (self.events[key]) {
            self.events[key]({ vm: self._self, event: event, props: this.props })
          }
        }
      }
    }
    const slots = {}
    if (self.slots) {
      for (let key in self.slots) {
        slots[key] = (scope) => {
          return self.slots[key](h, scope)
        }
      }
    }
    let disabled = self.disabled instanceof Function ? self.disabled() : self.disabled
    let readonly = self.readonly instanceof Function ? self.readonly() : self.readonly
    return h(self.componentName, {
      on: {
        input: function (event) {
          self.$emit('input', event)
        },
        change: function (event) {
          self.$emit('change', event)
        },
        ready: function (event) {
          self.$emit('ready', event)
        },
        ...events
      },
      scopedSlots: slots,
      props: {
        value: self.value,
        scope: self.scope,
        disabled: disabled,
        readonly: readonly,
        ...self.props
      }
    })
  }
}
</script>
