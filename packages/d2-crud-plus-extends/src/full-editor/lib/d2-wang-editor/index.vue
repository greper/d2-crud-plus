<template>
  <div>
    <div id="wEditor"></div>
    <textarea name="" class="wang-editor-preview" readonly v-model="currentValue"></textarea>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
// import { D2pUploader } from 'd2p-extends'
import lodash from 'lodash'
import { d2CrudPlus } from 'd2-crud-plus'
import wangConfig from './utils/config'
import util from '@/libs/util'

export default {
  name: 'd2-wang-editor',
  mixins: [d2CrudPlus.inputBase],
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    config: {
      type: Object
    },
    uploader: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      editor: null,
      currentValue: '',
      options: {}
    }
  },
  watch: {
    value: {
      handler (val) {
        // 确认是新的值
        if (val !== this.currentValue) {
          this.currentValue = val
          // 尝试更新
          if (this.editor) {
            this.dispatch('ElFormItem', 'el.form.blur')
            this.$emit('change', val)
            // this.editor.txt.html(this.value)
          }
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const editor = new WangEditor('#wEditor')
      lodash.merge(editor.config, wangConfig)
      editor.config.onchange = (newHtml) => {
        this.$emit('input', newHtml)
        this.currentValue = newHtml
      }

      if (editor.config.uploadImgServer) {
        const token = util.cookies.get('token')
        editor.config.uploadImgHeaders = {
          Authorization: token
        }
      }

      editor.create()
      editor.txt.html(this.currentValue)
      this.editor = editor
    }
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>
<style>
.wang-editor-preview{display: none;}
</style>
