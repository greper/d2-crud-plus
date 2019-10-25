<template>
  <el-upload :before-upload="beforeUpload"
             :class="uploadClass"
             :file-list="fileList"
             :http-request="httpRequest"
             :on-exceed="onExceed"
             :on-success="handleUploadFileSuccess"
             ref="fileUploader"
             v-bind="_elProps"
  >
    <el-button :size="btnSize" type="primary" v-if="_elProps.listType === 'text'">{{btnName}}</el-button>
    <i class="el-icon-plus" v-else-if="this._elProps.listType === 'picture-card'"></i>
    <template v-else-if="_elProps.listType ===  'avatar'">
      <img :src="avatarUrl" class="avatar" v-if="avatarUrl!=null">
      <i class="el-icon-plus avatar-uploader-icon" v-else></i>
    </template>
  </el-upload>
</template>

<script>
import SparkMD5 from 'spark-md5'
import choose from './choose'
/**
   * emit success(item,file)
   * fileList item = {url:'',name:''}
   */
export default {
  name: 'd2p-file-uploader',
  props: {
    btnSize: { default: 'small' },
    btnName: { default: '选择文件' },
    accept: {},
    type: {
      type: String,
      default: 'cos' // 上传类型：form cos qiniu  alioss
    },
    value: {
      type: [String, Array, Object]
    },
    suffix: { // 样式后缀 追加到url的后面，进行图片处理，需要到对象存储平台配置样式
      type: String,
      required: false
    },
    custom: { // 自定义参数
      type: Object
    },
    elProps: {
      type: Object
    }
  },
  data () {
    return {
      fileList: [],
      context: {}
    }
  },
  created () {
    this.initValue()
  },
  watch: {
    value (val) {
      if (val instanceof Array && val.length > 0 && val[0]._uid != null) {
        return
      }
      this.initValue()
      this.$emit('change', this.fileList)
    }
  },
  computed: {
    _elProps () {
      let defaultElProps = {
        limit: 1,
        listType: 'text',
        showFileList: true,
        action: ''
      }
      let props = Object.assign(defaultElProps, this.elProps)
      console.log('props:', props)
      return props
    },
    avatarUrl () {
      console.log('avatarUrl:', this.fileList[0])
      if (this.fileList.length > 0) {
        let file = this.fileList[0]
        if (file.response != null && file.response.url != null) {
          console.log('avatarUrl:', file.response.url)
          return file.response.url
        } else if (file.url != null) {
          return file.url
        }
      }
      return null
    },
    uploadClass () {
      if (this._elProps.listType === 'avatar') {
        return 'avatar-uploader'
      }
      return ''
    }
  },
  methods: {
    getUploader () {
      return choose.get(this.type)
    },
    initValue () {
      console.log('init value:', this.value)
      let fileList = []
      if (this.value == null) {
      } else if (typeof (this.value) === 'string') {
        if (this.value !== '') {
          let fileName = this.value.substring(this.value.lastIndexOf('/') + 1)
          fileList = [{ url: this.value, name: fileName }]
        }
      } else if (this.value instanceof Array) {
        fileList = this.value
      } else if (this.value instanceof Object) {
        fileList = [this.value]
      }
      this.resetFileList(fileList)
    },
    resetFileList (fileList) {
      console.log('reset file List', fileList)
      this.$set(this, 'fileList', fileList)
    },
    handleUploadFileSuccess (res, file, fileList) {
      res.size = res.size != null ? res.size : file.size
      res.name = res.name != null ? res.name : file.name
      this.$emit('success', res, file)
      this.resetFileList(fileList)
      let list = []
      for (let item of fileList) {
        if (item.response != null && item.response.url != null) {
          list.push({ ...item.response })
        } else {
          list.push(item)
        }
      }
      console.log('handleUploadFileSuccess list', list, res)
      if (this._elProps.limit === 1) {
        this.$emit('input', res)
      } else {
        this.$emit('input', list)
      }
    },
    beforeUpload (file) {
      let uploader = this.getUploader()
      console.log('uploader:', uploader)
      return uploader.beforeUpload(file, this.custom).then(ret => {
        this.$set(this, 'context', ret)
        console.log('beforeUpload:context:', ret)
        return ret
      })
    },
    httpRequest (option) {
      Promise.all([
        this.doUpload(option),
        this.computeMd5(option.file)
      ]).then((ret) => {
        // 得到组合结果， size，md5
        let result = ret[0]
        result.md5 = ret[1]
        option.onSuccess(result)
      })
    },
    doUpload (option) {
      console.error('do upload options:', option)
      return this.getUploader().doUpload(option, this.custom, this.context).then(ret => {
        if (this.suffix != null) {
          ret.url += this.suffix
        }
        return ret
      })
    },
    onExceed (files, fileList) {
      console.log('文件数量超出限制')
      if (this._elProps.limit === 1) {
        this.clearFiles()
        this.$refs.fileUploader.handleStart(files[0])
        this.$refs.fileUploader.submit()
        return
      }
      this.$message({
        showClose: true,
        message: '已达最大限制数量，请删除一个文件后再上传',
        type: 'warning'
      })
    },
    clearFiles () {
      if (this.$refs.fileUploader != null) {
        this.$refs.fileUploader.clearFiles()
      }
    },
    getFileList () {
      console.log('elFileUploader', this.fileList)
      return this.fileList
    },
    computeMd5 (file) {
      return new Promise((resolve, reject) => {
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        let chunkSize = 2097152 // Read in chunks of 2MB
        let chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        let spark = new SparkMD5.ArrayBuffer()
        let fileReader = new FileReader()

        fileReader.onload = (e) => {
          spark.append(e.target.result) // Append array buffer
          currentChunk++

          if (currentChunk < chunks) {
            loadNext()
          } else {
            let md5 = spark.end()
            console.info('computed hash', md5) // Compute hash

            resolve(md5)
          }
        }

        fileReader.onerror = function (error) {
          console.warn('oops, something went wrong.')
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('md5 computer error', error)
        }

        function loadNext () {
          let start = currentChunk * chunkSize
          let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }

        loadNext()
      })
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload{
    width: 148px;
    height: 148px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
  }
  .avatar-uploader .el-upload img{
    max-width: 148px;
    max-height: 148px;
  }

  .avatar-uploader .avatar-uploader-icon {
    vertical-align: top;
    font-size: 28px;
    color: #8c939d;
  }

  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    max-width: 100%;
    max-height: 100%;
    width:auto;
    height: auto;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-upload-list--picture-card .el-upload-list__item-status-label {

  }
  .el-form-item__content>div{display: flex;flex-wrap: wrap;}
  .el-upload-list--picture-card {
    display: flex;
    flex-wrap: wrap;
  }
</style>
