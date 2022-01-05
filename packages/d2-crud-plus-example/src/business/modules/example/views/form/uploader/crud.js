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
    viewOptions: {
      componentType: 'row'
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
        component: {
          props: {
            error: false
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }]
        }
      },
      {
        title: '加载失败url',
        key: 'avatar_error1',
        type: 'avatar-uploader',
        width: 120,
        component: {
          props: {
            error: 'http://greper.docmirror.cn/extends/error.jpg'
          }
        }
      },
      {
        title: '加载失败slot',
        key: 'avatar_error2',
        type: 'avatar-uploader',
        width: 120,
        component: {
          props: {
            error: 'slot'
          },
          slots: {
            // jsx 自定义错误展示
            error: (h, scope) => {
              return (<i class="el-icon-picture-outline" style='font-size:20px'/>)
            }
          }
        }
      },
      {
        title: '获取md5',
        key: 'avatar',
        type: 'avatar-uploader',
        width: 120,
        form: {
          component: {
            props: {
              returnType: 'object' // 返回值类型，object则返回{url:xx,md5:xx,size:xx} , url则仅返回字符串
            }
          },
          valueChange (key, value, form) { // 当返回值有变化时触发
            if (value != null) {
              form.avatarSize = value.size
              form.avatarMd5 = value.md5
            }
            console.log('avatar value Changed:', key, value, form)
          },
          helper: '上传后，右边将获取到头像大小和md5值，文件上传组件不支持裁剪，如需裁剪，请参考头像裁剪上传组件'
        },
        valueResolve (form) { // 将value解析成row的字段
          if (form.avatar != null && form.avatar.url != null) {
            form.avatar = form.avatar.url
          }
        }
      },
      {
        title: '头像文件大小',
        key: 'avatarSize',
        width: 120
      },
      {
        title: '头像文件md5',
        key: 'avatarMd5',
        width: 200
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
              elProps: { // 与el-uploader 配置一致
                multiple: true,
                limit: 5 // 限制5个文件
              },
              sizeLimit: 50 * 1024 // 不能超过限制
            },
            span: 24
          },
          rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
            validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
            message: '还有文件正在上传，请等待上传完成，或删除它'
          }],
          helper: '默认腾讯云cos上传,限制文件大小不能超过50k'
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
            elProps: { previewSrcList: null } // 禁用大图查看
          }
        }
      },
      {
        title: '文件列表',
        key: 'file',
        sortable: true,
        type: 'file-uploader',
        align: 'left',
        form: {
          component: {
            props: {
              elProps: { // element upload组件的props
                onPreview: (file) => { // 自定义点击事件
                  window.open(file.url)
                },
                limit: 0 // 不限制数量
              },
              uploader: {
                // action: 'http://d2p.docmirror.cn:7070/api/upload/form/upload',
                custom: {
                  keepName: true // 保持文件名，注意：中文及特殊符号文件名在ios上支持不是很好
                }
              }
            },
            span: 20,
            rules: [{ // 当有文件还未上传完成时，阻止表单提交，等待全部上传完成，才允许提交
              validator: D2pFileUploader.createAllUploadedValidator(vm.getFormComponentRef),
              message: '还有文件正在上传，请等待上传完成，或删除它'
            }]
          },
          helper: {
            slot: true
          }
        }
      }
    ]
  }
}
