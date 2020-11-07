<script>
import _set from 'lodash.set'
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
     * 以组件的某个props设置为row[key]的值
     *
     */
    valueBinding: {
      type: [String, Object]
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
    },
    /**
     * @description 传入的行数据
     */
    scope: {
      default: null
    }
  },
  computed: {
    _on () {
      const self = this
      const events = {}
      if (self.events || self.on) {
        const propsEvents = { ...self.events, ...self.on }
        for (const key in propsEvents) {
          events[key] = (event) => {
            if (propsEvents[key]) {
              propsEvents[key]({ vm: self._self, component: self._self.$refs.target, event: event, props: this.computedProps(), scope: this.scope })
            }
          }
        }
      }
      return {
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
      }
    }
  },
  render (h) {
    const self = this
    const scopedSlots = {}

    if (self.scopedSlots || self.slots) {
      const slots = { ...self.scopedSlots, ...self.slots }
      for (const key in slots) {
        scopedSlots[key] = (scope) => {
          return slots[key](h, scope)
        }
      }
    }

    const children = []
    if (self.children) {
      if (self.children instanceof Array) {
        for (const func of self.children) {
          children.push(func(h))
        }
      } else if (self.children instanceof Function) {
        const items = self.children(h)
        if (items instanceof Array) {
          children.push(...items)
        } else {
          children.push(items)
        }
      }
    }

    return h(self.componentName, {
      on: self._on,
      attrs: self.$attrs,
      scopedSlots: scopedSlots,
      props: self.computedProps(),
      ref: 'target'
    }, children)
  },
  methods: {
    getComponentRef () {
      return this.$refs.target
    },
    computedProps () {
      const props = {
        value: this.value,
        scope: this.scope,
        disabled: this.disabled,
        readonly: this.readonly,
        ...this.props
      }
      if (this.valueBinding) {
        if (typeof this.valueBinding === 'string') {
          _set(props, this.valueBinding, this.value)
        } else {
          const prop = this.valueBinding.prop
          const handle = this.valueBinding.handle
          _set(props, prop, handle({ value: this.value }))
        }
      }
      return props
    }
  }
}
</script>
