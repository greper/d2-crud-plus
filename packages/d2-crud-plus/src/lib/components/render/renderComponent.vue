<script>
export default {
  name: 'render-component',
  props: {
    /**
     * @description 传入的render函数
     */
    renderFunction: {
      type: Function,
      required: true
    },
    /**
     * @description 传入的scope
     */
    scope: {
      default: null
    }
  },
  render (h) {
    return this.renderFunction(h, this.scope)
  },
  methods: {

  }
}
</script>
