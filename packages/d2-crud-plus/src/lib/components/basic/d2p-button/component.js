import './style.scss'
export default {
  name: 'd2p-button',
  render () {
    const button =
      <el-button
        { ...{ attrs: this.$attrs } }
        class={
          {
            'd2p-button': true,
            'is-thin': this.thin
          }
        }
        type={this.type}
        style={ this.block ? { width: '100%' } : {} }
        on-click={ this.onClick }>
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
    block: {
      type: Boolean,
      default: false,
      required: false
    },
    thin: {
      type: Boolean,
      default: false,
      required: false
    },
    type: {
      type: String
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  }
}
