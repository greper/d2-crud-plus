<template>
  <div >
    <div class="image-list">
      <el-image v-for="(item) in _list" :key="item"
        style="width: 100px; height: 100px"
        :src="item"
        :fit="fit"></el-image>
      <div class="image-item" @click="addNewImage">
        <i class="el-icon-plus cropper-uploader-icon" ></i>
      </div>
    </div>
    <el-dialog class="cropper-uploader quying-dialog" title="上传图片" :visible.sync="dialogVisible" append-to-body
               :before-close="handleClose" :close-on-click-modal="true" ref="editAvatar" :width="_dialogWidth" :height="_dialogHeight">
          <div class="cropper-uploader-wrap">
            <input type="file" v-show="false" ref="fileinput" accept=".jpg, .jpeg, .png, .gif" @change="handleChange">
            <!-- step1 -->
            <div class="cropper-uploader__choose cropper-uploader_left" v-show="!current && !isSuccess">
              <el-button round @click="handleClick">+选择图片</el-button>
              <p>只支持JPG,PNG,GIF,大小不超过5M</p>
            </div>
            <!-- step2 -->
            <div class="cropper-uploader__edit cropper-uploader_left" v-show="current || isSuccess">
              <div class="cropper-uploader__edit-area">
                <section class="cropper-area">
                  <div class="img-cropper">
                    <vue-cropper
                      ref="cropper"
                      :aspect-ratio="16 / 9"
                      :src="imgSrc"
                      preview=".preview"
                    />
                  </div>
                </section>
              </div>
              <div style="margin:10px;">
                <el-button-group>
                  <el-button round icon="el-icon-edit" @click="handleClick">重新选择</el-button>
                  <el-button round icon="el-icon-share">翻转</el-button>
                  <el-button round icon="el-icon-delete">旋转</el-button>
                  <el-button round icon="el-icon-delete">重置</el-button>
                </el-button-group>
              </div>
            </div>
            <div class="cropper-uploader__preview">
              <span class="cropper-uploader__preview-title">预览</span>
              <div class="cropper-uploader__preview-120 preview">
              </div>
              <span>120*120</span>
            </div>
          </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="summitAvata()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import VueCropper from './cropper/vue-cropper'
export default {
  name: 'd2p-image-cropper',
  components: {
    VueCropper
  },
  props: {
    // 初始图片url
    value: {
      type: [String, Array]
    },
    dialogHeight: {
      type: [String, Number]
    },
    dialogWidth: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    width: {
      type: [String, Number]
    }
  },
  data () {
    return {
      imgSrc: '',
      cropImg: '',
      data: null,
      dialogVisible: false,
      current: undefined,
      cropper: {
        img: this.current,
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: false,
        fixed: true,
        fixedNumber: [1, 1],
        outputType: 'png'
      },
      isSuccess: false,
      cropImgBlob: null,
      previews: {}
      // step: 2
    }
  },
  computed: {
    _list () {
      const list = []
      if (this.value == null || this.value === '') {
        return
      }
      if (typeof (this.value) === 'string') {
        list.push(this.value)
      } else {
        list.push(this.value)
      }
      return list
    },
    _dialogHeight () {
      let height = this.dialogHeight
      if (height == null) {
        height = document.documentElement.clientHeight * 0.6
        if (height < 300) {
          height = 300
        }
      }
      return height
    },
    _dialogWidth () {
      let width = this.dialogWidth
      if (width == null) {
        width = '50%'
      }
      return width
    }
  },
  methods: {
    addNewImage () {
      this.dialogVisible = true
    },
    /*
         * fixMe: 检查文件类型
         *
         * input标签的accept属性可能有兼容性问题（暂不解决）
         * 参阅 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
         */
    /* -------------------------------头像上传组件start-------------------------------- */
    preventDefault (e) {
      e.preventDefault()
      return false
    },
    // 点击按钮打开文件资源窗口
    handleClick (e) {
      if (e.target !== this.$refs.fileinput) {
        e.preventDefault()
        if (document.activeElement !== this.$refs) {
          this.$refs.fileinput.click()
        }
      }
    },
    // 检测选择的文件是否合适
    checkFile (file) {
      // 仅限图片
      if (file.type.indexOf('image') === -1) {
        this.$message({
          message: '请选择合适的文件类型',
          type: 'warning'
        })

        return false
      }
      // 超出大小
      if (file.size / 1024 > 5120) {
        this.$message({
          message: '图片大小超出5MB，请重新选择',
          type: 'warning'
        })
        return false
      } else {
        // console.log((file.size / 1024).toFixed(1) + 'KB')
      }
      return true
    },
    // 设置图片源
    setSourceImg (file) {
      let that = this
      let fr = new FileReader()
      fr.onload = function (e) {
        that.cropper.img = fr.result
      }
      fr.readAsDataURL(file)
    },
    // 触发input框的change事件选择图片
    handleChange (e) {
      e.preventDefault()
      let files = e.target.files || e.dataTransfer.files
      console.log(this.$refs)
      this.$refs.cropper.rotate = 0 // 重置要裁剪的图片的旋转角度
      this.isSuccess = true
      if (this.checkFile(files[0])) {
        this.setSourceImg(files[0])
        this.setImage(e)
      }
    },
    // 点击向右旋转
    rotateRight (e) {
      e.preventDefault()
      this.$refs.cropper.rotateRight()
    },
    // 点击关闭弹窗
    handleClose () {
      this.dialogVisible = false
      this.cropper.img = ''
      this.$emit('on-close')
    },
    // 实时预览
    realTime (data) {
      this.previews = data
    },
    // 点击确定上传裁剪完的头像图片（blob类型）
    summitAvata () {
      this.$refs.cropper.getCropBlob(data => {
        // this.cropImgBlob = data;
        // let params = {
        //   file: data
        // }
        this.$emit('uploadAvatar', data)
        this.dialogVisible = !this.dialogVisible
      })
    },
    // 判断当前处于step1还是step2，切换step
    // isStep1() {
    //   if (!this.photo) {
    //     this.step = 1;
    //     return true;
    //   } else {
    //     this.step = 2;
    //     return false;
    //   }
    // }
    /* -------------------------------头像上传组件end-------------------------------- */

    cropImage () {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    flipX () {
      const dom = this.$refs.flipX
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleX(scale)
      dom.setAttribute('data-scale', scale)
    },
    flipY () {
      const dom = this.$refs.flipY
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleY(scale)
      dom.setAttribute('data-scale', scale)
    },
    getCropBoxData () {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4)
    },
    getData () {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4)
    },
    move (offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY)
    },
    reset () {
      this.$refs.cropper.reset()
    },
    rotate (deg) {
      this.$refs.cropper.rotate(deg)
    },
    setCropBoxData () {
      if (!this.data) return
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data))
    },
    setData () {
      if (!this.data) return
      this.$refs.cropper.setData(JSON.parse(this.data))
    },
    setImage (e) {
      const file = e.target.files[0]
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file')
        return
      }
      // if (this.imgSrc == null || this.imgSrc === '') {
      //   return
      // }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    showFileChooser () {
      this.$refs.input.click()
    },
    zoom (percent) {
      this.$refs.cropper.relativeZoom(percent)
    }
  },
  watch: {
    // 实时预览
    previews: function () {
      this.$refs.cropper.getCropData(data => {
        this.previews.url = data
      })
    }
  },
  activated () {
    this.isSuccess = false
  }
}
</script>

<style lang="scss" scoped>
 .image-list{
   display: flex;
   justify-content: left;
   align-items: center;
   .image-item{
     width: 100px;
     height: 100px;
     display: flex;
     justify-content: center;
     align-items: center;
     background-color: #fbfdff;
     border: 1px dashed #c0ccda;
     border-radius: 6px;
      cursor: pointer;
     .cropper-uploader-icon {
       vertical-align: top;
       font-size: 28px;
       color: #8c939d;
     }
   }
 }

  $area-height: 280px;
  .cropper-uploader {
    &-wrap {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100%;
    }

    &_left {
      font-size: 13px;
      color: #999999;
      position: relative;
      background: #ecf2f6;
      flex-grow:5;
      margin:10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction:  column
    }

    &__choose {
      p {
        width: 100%;
        text-align: center;
      }
    }

    &__edit {
      &-area {
        width:100%;
        height: 100%;
        overflow: hidden;

        &-img {
          object-fit: cover;
        }
      }
    }

    $top: 30px;

    &__preview {
      background: #ecf2f6;
      text-align: center;
      width: 200px;
      padding-top: $top;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 13px;
      margin:10px;
      &-title {
        color: #999999;
      }
      .preview{
        overflow: hidden;
      }

      img {
        background: #fff;
        margin-top: 5px;
        border-radius: 500px;
      }

      &-120 {
        height: 120px;
        width: 120px;
      }

      &-65 {
        height: 45px;
        width: 45px;
      }

      &-40 {
        height: 30px;
        width: 30px;
      }
    }
  }
</style>
