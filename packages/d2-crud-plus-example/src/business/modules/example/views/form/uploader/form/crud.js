import util from '@/libs/util'
import { D2pFileUploader } from 'd2p-extends'
export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    searchOptions: {
      show: null
    },
    viewOptions: {
      componentType: 'form'
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
        title: '头像',
        key: 'avatar1',
        type: 'avatar-uploader',
        width: 120,
        form: {
          component: {
            props: {
              uploader: {
                type: 'form',
                withCredentials: true
              }
            },
            rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
              validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
              message: '还有文件正在上传，请等待上传完成，或删除它'
            }]
          }
        }
      },
      {
        title: '照片墙',
        key: 'image',
        type: 'image-uploader',
        width: 150,
        align: 'left',
        form: {
          component: {
            props: {
              uploader: {
                type: 'form',
                successHandle (ret, option) {
                  if (ret.data == null || ret.data === '') {
                    throw new Error('上传失败')
                  }
                  return { url: ret.data, key: option.data.key }
                }
              },
              returnType: 'key', // 添加和编辑上传提交的值不要url，而只要key
              buildUrl (value, item) {
                return '/api/upload/form/download?key=' + value
              },
              elProps: { // 与el-uploader 配置一致
                multiple: true,
                limit: 5 // 限制5个文件
              },
              sizeLimit: 50 * 1024 // 不能超过限制
            },
            span: 24
          },
          on: {
            blur (event) {
              console.log('blur', event)
            }
          },
          helper: '限制文件大小不能超过50k',
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }]
        },
        component: {
          props: {
            buildUrl (value, item) {
              console.log('build url:', value)
              if (value && value.indexOf('http') !== 0) {
                return '/api/upload/form/download?key=' + value
              }
              return value
            }
          }
        }
      },
      {
        title: '图片列表',
        key: 'image2',
        type: 'image-uploader',
        width: 150,
        align: 'left',
        form: {
          component: {
            props: {
              uploader: {
                type: 'form'
              },
              elProps: { // 与el-uploader 配置一致
                multiple: true,
                listType: 'picture',
                limit: 5 // 限制5个文件
              }
            }
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }]
        },
        component: {
          props: {
            buildUrl: function (url) {
              return url + '?token=' + util.cookies.get('token')
            }
          }
        }
      },
      {
        title: '文件',
        key: 'file',
        sortable: true,
        type: 'file-uploader',
        align: 'left',
        form: {
          component: {
            props: {
              sizeLimit: 50 * 1024 * 1024, // 限制文件大小
              elProps: { // element upload组件的props
                onPreview: (file) => { // 自定义点击事件
                  window.open(file.url)
                },
                limit: 0 // 不限制数量
              },
              uploader: {
                type: 'form',
                // action: 'http://d2p.veryreader.com:7070/api/upload/form/upload',
                custom: {
                  keepName: true // 保持文件名，注意：中文及特殊符号文件名在ios上支持不是很好
                }
              }
            },
            span: 20
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }]
        }
      }

    ]
  }
}
