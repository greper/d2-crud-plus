<template>
  <el-upload :accept="accept" :action="action"
             :before-upload="beforeUpload"
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
    randomFileName: {
      type: Boolean,
      default: true
    }, // 是否随机一个文件名
    fileType: {
      type: String,
      default: 'file'
    },
    type: {
      type: String,
      default: 'cos' // 上传类型：form cos qiniu  aliyun
    },
    value: {
      type: [String, Array, Object]
    },
    elProps: {
      type: Object
    }
  },
  data () {
    return {
      action: '',
      fileList: []
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
    }
  },
  computed: {
    _elProps () {
      let defaultElProps = {
        limit: 1,
        listType: 'text',
        showFileList: true
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
      return require('./uploader/' + this.type + '.js').default
    },
    initValue () {
      console.log('init value:', this.value)
      let fileList = []
      if (this.value == null) {
      } else if (typeof (this.value) === 'string') {
        let fileName = this.value.substring(this.value.lastIndexOf('/') + 1)
        fileList = [{ url: this.value, name: fileName }]
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
      if (this.limit === 1) {
        this.$emit('input', res)
      } else {
        this.$emit('input', list)
      }

      console.log('handleUploadFileSuccess list', list, res)
    },
    beforeUpload (file) {
      let uploader = this.getUploader()
      console.log('uploader:', uploader)
      return uploader.beforeUpload(this, file)
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
      return this.getUploader().doUpload(this, option)
    },
    onExceed (files, fileList) {
      console.log('文件数量超出限制')
      if (this._elProps.limit === 1) {
        this.clearFiles()

        // this.fileList.length=0;
        // fileList.push(files[0]);
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
          console.log('read chunk nr', currentChunk + 1, 'of', chunks)
          spark.append(e.target.result) // Append array buffer
          currentChunk++

          if (currentChunk < chunks) {
            loadNext()
          } else {
            console.log('finished loading')
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

  .avatar-uploader .el-upload img{
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
  }

  .avatar-uploader .avatar-uploader-icon {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
  }
</style>
