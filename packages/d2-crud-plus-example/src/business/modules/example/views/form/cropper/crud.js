import { D2pFileUploader } from 'd2p-extends'

export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    searchOptions: {
      disabled: true,
      show: null
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 90,
        form: {
          disabled: true
        }
      },
      {
        title: '头像裁剪',
        key: 'avatar',
        type: 'avatar-cropper',
        form: {
          valueChange (key, value, form, context) {
            console.log('avatar chagned', key, value)
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }]
        }
      },
      {
        title: '支持多个',
        key: 'multi',
        type: 'avatar-cropper',
        align: 'left',
        form: {
          component: {
            props: {
              limit: 5
            }
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }],
          helper: '可上传5张图片'
        }
      },
      {
        title: '其他比例',
        key: 'aspectRatio',
        type: 'avatar-cropper',
        form: {
          component: {
            props: {
              cropper: {
                aspectRatio: 16 / 9
              }
            }
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }],
          helper: '16 / 9'
        }
      },
      {
        title: '阿里云',
        key: 'alioss',
        type: 'avatar-cropper',
        form: {
          component: {
            props: {
              type: 'alioss'
            }
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }],
          helper: '上传到阿里云oss'
        }

      },
      {
        title: '七牛',
        key: 'qiniu',
        type: 'avatar-cropper',
        form: {
          component: {
            props: {
              type: 'qiniu'
            }
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }],
          helper: '上传到七牛'
        }
      },
      {
        title: '本地服务器',
        key: 'local',
        type: 'avatar-cropper',
        form: {
          component: {
            props: {
              uploader: {
                type: 'form',
                action: process.env.VUE_APP_API + 'upload/form/upload',
                name: 'file'
              }
            }
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }],
          helper: '上传到本地服务器'
        }
      }
    ]
  }
}
