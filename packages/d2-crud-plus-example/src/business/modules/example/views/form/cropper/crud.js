export const crudOptions = {
  columns: [
    {
      title: '头像裁剪',
      key: 'avatar',
      type: 'avatar-cropper'
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
            type: 'form',
            elProps: {
              action: '/api/upload/form/upload',
              name: 'file'
            }
          }
        },
        helper: '上传到本地服务器'
      }
    }
  ]
}
