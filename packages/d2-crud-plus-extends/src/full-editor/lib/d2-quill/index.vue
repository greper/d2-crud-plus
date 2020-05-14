<template>
  <div ref="editor" style="width:100%;min-height: 300px;"></div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import uploadChoose from '../../../file-uploder/lib/choose'
export default {
  name: 'd2p-quill',
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    // 上传后端类型，[cos,qiniu,alioss]
    type: {
      type: String,
      default: 'cos' // 上传类型：form / cos / qiniu / alioss
    },
    // form上传参数， elProps.action=上传连接， elProps.headers=header，elProps.name=文件参数名
    elProps: {
      type: Object
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
      })
      this.Quill.on('selection-change', (range, oldRange, source) => {
        this.$emit('selection-change', range, oldRange, source)
      })
      this.Quill.on('editor-change', (eventName, ...args) => {
        this.$emit('editor-change', eventName, ...args)
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
        this.beforeUpload(file).then(context => {
          console.log('context', context)
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
            onProgress,
            onError
          }
          if (this.elProps != null) {
            option.action = this.elProps.action
            option.filename = this.elProps.name
          }

          this.doUpload(option, context).then(upload => {
            let url = item.url = upload.url
            item.status = 'done'
            let range = quill.getSelection(true)
            // let index = range.index + range.length
            quill.insertEmbed(range.index, 'image', url)
          })
        })
      })
      Imageinput.click()
    },
    doUpload (option, context) {
      return this.getUploader().doUpload(option, {}, context).then(ret => {
        return ret
      })
    },
    getUploader () {
      return uploadChoose.get(this.type)
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
