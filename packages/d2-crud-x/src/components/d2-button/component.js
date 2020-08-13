export default {
  name: 'd2-button',
  render () {
    const button =
      <el-button
        { ...{ attrs: this.$attrs } }
        class={
          {
            'd2-button': true,
            'is-thin': this.thin
          }
        }
        style={ this.block ? { width: '100%' } : {} }
        on-click={ this.onClick }>
        { this.fa ? <d2-icon name={ this.fa }/> : undefined }
        { this.fa && (this.label || this.$slots.default) ? ' ' : undefined }
        { this.label ? this.label : undefined }
        { this.$slots.default }
      </el-button>
    return button
  },
  props: {
    fa: {
      type: String,
      default: '',
      required: false
    },
    label: {
      type: String,
      default: '',
      required: false
    },
    to: {
      type: [String, Object],
      default: '',
      required: false
    },
    block: {
      type: Boolean,
      default: false,
      required: false
    },
    thin: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    onClick (e) {
      if (this.to) {
        this.$router.push(this.to)
      }
      this.$emit('click', e)
    }
  }
}
