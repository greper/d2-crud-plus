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
      default: null
    },
    /**
     * @description 传入的行数据
     */
    scope: {
      default: null
    },
    /**
     * 监听组件事件
     */
    events: {
      default: null
    }
  },
  render (h) {
    let self = this
    let events = {}
    if (self.events) {
      for (let key in self.events) {
        events[key] = (event) => {
          if (self.events[key]) {
            self.events[key]({ vm: self._self, event: event, props: this.props })
          }
        }
      }
    }
    return h(self.componentName, {
      props: {
        value: self.value,
        scope: self.scope,
        ...self.props
      },
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
      }
    })
  }
}
</script>
