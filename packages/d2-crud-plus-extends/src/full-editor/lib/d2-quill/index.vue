<template>
  <div ref="editor"  class="ql-editor d2p-quill" :class="{'is-disabled':'disabled'}" style="width:100%;min-height: 300px;"></div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import D2pUploader from '../../../uploader'
import lodash from 'lodash'
import { d2CrudPlus } from 'd2-crud-plus'
// quill富文本编辑器
export default {
  name: 'd2p-quill',
  mixins: [d2CrudPlus.input],
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    config: {
      type: Object
    },
    // 上传参数，会临时覆盖全局上传配置参数[d2p-uploader](/guide/extends/uploader.html)
    uploader: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      Quill: undefined,
      currentValue: '',
      options: {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ 'font': ['Microsoft-YaHei', 'SimSun', 'SimHei', 'KaiTi', 'Arial', 'Times-New-Roman'] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        },
        placeholder: '书写你的内容',
        readOnly: false
      }
    }
  },
  watch: {
    disabled (value) {
      if (this.Quill) {
        this.Quill.enable(!value)
      }
    },
    value: {
      handler (val) {
        // 确认是新的值
        if (val !== this.currentValue) {
          this.currentValue = val
          // 尝试更新
          if (this.Quill) {
            this.$emit('change', val)
            this.Quill.pasteHTML(this.value)
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
      const editor = this.$refs.editor
      // 初始化编辑器
      lodash.merge(this.options, this.config)
      this.Quill = new Quill(editor, this.options)

      let toolbar = this.Quill.getModule('toolbar')
      toolbar.addHandler('image', () => {
        this.handlerImage()
      })

      // 默认值
      this.Quill.enable(false)
      this.Quill.pasteHTML(this.currentValue)
      this.$nextTick(() => {
        this.Quill.enable(true)
      })
      // 绑定事件
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        const html = this.$refs.editor.children[0].innerHTML
        // const text = this.Quill.getText()
        // const quill = this.Quill
        // 更新内部的值
        this.currentValue = html
        // 发出事件 v-model
        this.$emit('input', html)
        // 发出事件 change
        this.$emit('change', html)
      })
      // 将一些 quill 自带的事件传递出去
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        // 文本变更事件
        this.$emit('text-change', delta, oldDelta, source)
      })
      this.Quill.on('selection-change', (range, oldRange, source) => {
        // 选择框变更事件
        this.$emit('selection-change', range, oldRange, source)
      })
      this.Quill.on('editor-change', (eventName, ...args) => {
        // editor-change事件
        this.$emit('editor-change', eventName, ...args)
      })
      this.$nextTick(() => {
        // 编辑器ready事件
        this.$emit('ready', { vm: this, quill: this.Quill })
      })
    },
    handlerImage () {
      let quill = this.Quill
      var Imageinput = document.createElement('input')
      Imageinput.setAttribute('type', 'file')
      Imageinput.setAttribute('name', 'upload_file')
      Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg')
      Imageinput.classList.add('ql-image')
      Imageinput.addEventListener('change', () => {
        var file = Imageinput.files[0]

        let item = {
          status: 'uploading',
          progress: 0
        }

        let onProgress = (e) => {
          item.progress = e.percent
        }
        let onError = (e) => {
          item.status = 'error'
          item.message = '文件上传出错:' + e.message
          console.log(e)
        }
        let option = {
          file: file,
          fileName: file.name,
          onProgress,
          onError
        }

        this.doUpload(option).then(upload => {
          let url = item.url = upload.url
          item.status = 'done'
          let range = quill.getSelection(true)
          // let index = range.index + range.length
          quill.insertEmbed(range.index, 'image', url)
        })
      })
      Imageinput.click()
    },
    doUpload (option) {
      option.config = this.uploader
      return this.getUploader().then(uploader => {
        return uploader.upload(option)
      })
    },
    getUploader () {
      let type = this.type
      if (this.uploader != null && this.uploader.type != null) {
        type = this.uploader.type
      }
      return D2pUploader.getUploader(type)
    },
    beforeUpload (file) {
      return this.getUploader().beforeUpload(file)
    }
  }
}
</script>
<style lang="scss">
  .ql-toolbar{
    line-height: 24px;
  }
  .ql-disabled{
    cursor: not-allowed;
    .ql-editor{
      cursor: not-allowed;
    }
  }

</style>
