<template>
  <div ref="editor" style="width:100%;min-height: 300px;"></div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import D2pUploader from '../../../uploader'
export default {
  name: 'd2p-quill',
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    // 上传config参数 type=[alioss/cos/qiniu/form]，action=上传链接，headers=请求headers[Object]，name=文件参数名,会临时覆盖默认配置
    uploader: {
      type: Object,
      default: () => {
        return { type: 'cos' }
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
            // [{ 'script': 'sub' }, { 'script': 'super' }],
            // [{ 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            // [{ 'font': [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image']
          ]
        },
        placeholder: '书写你的内容',
        readOnly: false
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        // 确认是新的值
        if (val !== this.currentValue) {
          this.currentValue = val
          // 尝试更新
          if (this.Quill) {
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
      this.Quill = new Quill(editor, this.options)

      let toolbar = this.Quill.getModule('toolbar')
      toolbar.addHandler('image', () => {
        this.handlerImage()
      })

      // 默认值
      this.Quill.pasteHTML(this.currentValue)
      // 绑定事件
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        const html = this.$refs.editor.children[0].innerHTML
        const text = this.Quill.getText()
        const quill = this.Quill
        // 更新内部的值
        this.currentValue = html
        // 发出事件 v-model
        this.$emit('input', html)
        // 发出事件
        this.$emit('change', { html, text, quill })
      })
      // 将一些 quill 自带的事件传递出去
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        this.$emit('text-change', delta, oldDelta, source)
        console.log('text-change')
      })
      this.Quill.on('selection-change', (range, oldRange, source) => {
        this.$emit('selection-change', range, oldRange, source)
        console.log('editor-change')
      })
      this.Quill.on('editor-change', (eventName, ...args) => {
        this.$emit('editor-change', eventName, ...args)
        console.log('editor-change')
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
      return this.getUploader().upload(option)
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
<style>
  .ql-toolbar{
    line-height: 24px;
  }

</style>
