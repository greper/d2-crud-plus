export const crudOptions = {
  columns: [
    {
      title: '头像',
      key: 'avatar',
      type: 'avatar-uploader',
      width: 200,
      form: {
        valueChange (key, value, form) {
          console.log('valueResolve', value)
          if (value != null) {
            form.avatarSize = value.size
            form.avatarMd5 = value.md5
          }
        },
        helper: '上传后，右边将获取到头像大小和md5值'
      }
    },
    {
      title: '头像文件大小',
      key: 'avatarSize',
      width: 200
    },
    {
      title: '头像文件md5',
      key: 'avatarMd5',
      width: 200
    },
    {
      title: '图片',
      key: 'image',
      type: 'image-uploader',
      width: 200,
      form: {
        component: {
          props: {
            elProps: { // 与el-uploader 配置一致
              limit: 5 // 限制5个文件
            }
          },
          span: 24
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
      form: {
        component: {
          props: {
            type: 'alioss',
            style: '!200_200'
          },
          span: 24
        },
        helper: '这里演示的是阿里云文件上传,配置样式，居中裁剪成200x200方形图片'
      }
    }
  ]
}
