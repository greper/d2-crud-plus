<template>
  <div class="d2p-wangeditor">
    <div id="wEditor"></div>
    <textarea name="" class="wang-editor-preview" readonly v-model="currentValue"></textarea>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
// import { D2pUploader } from 'd2p-extends'
import lodash from 'lodash'
import wangConfig from './utils/config'
import D2pUploader from '../../../uploader'
import { d2CrudPlus } from '../../../utils/d2-crud-plus'
import log from '../../../utils/util.log'
export default {
  name: 'd2p-wang-editor',
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
      lodash.merge(wangConfig, this.config)
      lodash.merge(editor.config, wangConfig)
      editor.config.onchange = (newHtml) => {
        this.$emit('input', newHtml)
        this.currentValue = newHtml
      }

      if (!editor.config.uploadImgServer) {
        editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
          // resultFiles 是 input 中选中的文件列表
          // insertImgFn 是获取图片 url 后，插入到编辑器的方法
          var file = resultFiles[0]

          const item = {
            status: 'uploading',
            progress: 0
          }

          const onProgress = (e) => {
            item.progress = e.percent
          }
          const onError = (e) => {
            item.status = 'error'
            item.message = '文件上传出错:' + e.message
            log.debug(e)
          }
          const option = {
            file: file,
            fileName: file.name,
            onProgress,
            onError
          }

          const ret = await this.doUpload(option)
          // 上传图片，返回结果，将图片插入到编辑器中
          insertImgFn(ret.url)
        }
      }

      editor.create()
      editor.txt.html(this.currentValue)
      this.editor = editor
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
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>
<style lang="scss">
.d2p-wangeditor{
  .wang-editor-preview{display: none;}

  .w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text] {
    height: auto;
    }

}
</style>
