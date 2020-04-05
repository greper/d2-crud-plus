<template>
  <div >
    <div class="image-list">
      <el-image v-for="(item) in _list" :key="item"
        style="width: 100px; height: 100px"
        :src="item"
        :fit="fit"></el-image>
      <div class="image-item">
        <i class="el-icon-plus avatar-uploader-icon" ></i>
      </div>

    </div>
    <el-dialog class="avatar-uploader quying-dialog" title="上传图片" :visible.sync="dialogVisible" width="490px"
               :before-close="handleClose" :close-on-click-modal="true" ref="editAvatar">
      <div class="avatar-uploader-wrap">
        <!-- step1 -->
        <div class="avatar-uploader__choose avatar-uploader_left" v-show="!current && !isSuccess">
          <button class="avatar-uploader_left__btn" @click="handleClick">+选择图片</button>
          <p>只支持JPG,PNG,GIF,大小不超过5M</p>
          <input type="file" v-show="false" ref="fileinput" accept=".jpg, .jpeg, .png, .gif" @change="handleChange">
        </div>
        <!-- step2 -->
        <div class="avatar-uploader__edit" v-show="current || isSuccess">
          <div class="avatar-uploader_left avatar-uploader__edit-area">
            <vueCropper ref="cropper"
                        :img="cropper.img"
                        :info="false"
                        :autoCrop="cropper.autoCrop"
                        :autoCropWidth="cropper.autoCropWidth"
                        :autoCropHeight="cropper.autoCropHeight"
                        :fixedBox="cropper.fixedBox"
                        @realTime="realTime"
                        :outputType="cropper.outputType"
                        :fixed="cropper.fixed"
                        :fixedNumber="cropper.fixedNumber">

            </vueCropper>
          </div>
          <input type="file" v-show="false" ref="fileinput" accept=".jpg, .jpeg, .png, .gif" @change="handleChange">
          <button class="avatar-uploader_left__btn" @click="handleClick">+重新选择</button>
          <button class="avatar-uploader_left__btn" @click="rotateRight">+旋转90°</button>
        </div>
        <div class="avatar-uploader__preview">
          <span class="avatar-uploader__preview-title">预览</span>
          <img :src="previews.url" alt="" class="avatar-uploader__preview-120">
          <span>120*120</span>
          <img :src="previews.url" alt="" class="avatar-uploader__preview-65">
          <span>65*65</span>
          <img :src="previews.url" alt="" class="avatar-uploader__preview-40">
          <span>40*40</span>
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
import vueCropper from 'vue-cropper'

export default {
  name: 'd2p-image-cropper',
  props: {
    // 初始图片url
    value: {
      type: [String, Array]
    }
  },
  data () {
    return {
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
  components: {
    vueCropper
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
    }
  },
  methods: {
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
      }
    },
    // 点击向右旋转
    rotateRight (e) {
      e.preventDefault()
      this.$refs.cropper.rotateRight()
    },
    // 点击关闭弹窗
    handleClose () {
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
    }
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
     .avatar-uploader-icon {
       vertical-align: top;
       font-size: 28px;
       color: #8c939d;
     }
   }
 }

  $area-height: 280px;
  .avatar-uploader {
    &-wrap {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100%;
    }

    &_left {
      height: $area-height;
      width: $area-height;
      font-size: 13px;
      color: #999999;
      position: relative;
      background: #ecf2f6;

      &__btn {
        color: #999999;
        width: 88px;
        height: 34px;
        border: none;
        background: #fff;
        outline: none;
        border: 1px solid #cecece;
        border-radius: 82px;
      }
    }

    &__choose {
      p {
        margin-top: 59%;
        width: 100%;
        text-align: center;
      }

      button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &__edit {
      &-area {
        overflow: hidden;

        &-img {
          object-fit: cover;
        }
      }

      button {
        margin-top: 13px;
      }

      button:last-child {
        float: right;
      }
    }

    $top: 30px;

    &__preview {
      background: #ecf2f6;
      text-align: center;
      width: 158px;
      padding-top: $top;
      height: $area-height - $top;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 13px;

      &-title {
        color: #999999;
      }

      img {
        background: #fff;
        margin-top: 5px;
        border-radius: 500px;
      }

      &-120 {
        height: 60px;
        width: 60px;
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

<style lang="scss">
  // 小的弹窗用el-messagebox，大弹窗有复杂交互的用el-dialog
  // 弹窗（el-dialog）样式修改
  .quying-dialog {
    .el-dialog__body {
      padding: 5px 20px;
      overflow: hidden;
    }

    .el-dialog__headerbtn .el-dialog__close {
      font-size: 20px;
    }

    .el-dialog__footer {
      text-align: center;
      padding: 20px 20px 30px 20px;
    }
  }
</style>
