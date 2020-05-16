export const crudOptions = {
  columns: [
    {
      title: '头像',
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
          if (value != null && value.length > 0 && value[0] != null) {
            form.avatarSize = value[0].size
            form.avatarMd5 = value[0].md5
          }
        },
        helper: '上传后，右边将获取到头像大小和md5值，文件上传组件不支持裁剪，如需裁剪，请参考头像裁剪上传组件'
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
      form: {
        component: {
          props: {
            elProps: { // 与el-uploader 配置一致
              multiple: true,
              limit: 5 // 限制5个文件
            }
          }
        },
        helper: '默认腾讯云cos上传'
      }
    },
    {
      title: '图片列表',
      key: 'image2',
      type: 'image-uploader',
      width: 150,
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
        helper: '默认腾讯云cos上传'
      }
    },
    {
      title: '文件',
      key: 'file',
      sortable: true,
      type: 'file-uploader',
      form: {
        component: {
          props: {
            elProps: {// element upload组件的props
              limit: 0 // 不限制数量
            }
          }
        }
      }
    },
    {
      title: '七牛',
      key: 'qiniuAvatar',
      sortable: true,
      type: 'avatar-uploader',
      width: 100,
      form: {
        component: {
          props: {
            type: 'qiniu'
          }
        },
        helper: '这里演示的是七牛文件上传'
      }
    },
    {
      title: '阿里云',
      key: 'aliossAvatar',
      sortable: true,
      type: 'avatar-uploader',
      width: 100,
      form: {
        component: {
          props: {
            type: 'alioss',
            suffix: '!200_200'
          },
          span: 24
        },
        helper: '这里演示的是阿里云文件上传,配置样式，居中裁剪成200x200方形图片'
      }
    },
    {
      title: '本地服务器上传',
      key: 'formAvatar',
      sortable: true,
      type: 'avatar-uploader',
      width: 130,
      form: {
        component: {
          props: {
            type: 'form',
            uploader: {
              action: process.env.VUE_APP_API + 'upload/form/upload',
              name: 'file'
            }
          },
          span: 24
        },
        helper: 'form表单上传'
      }
    }
  ]
}
