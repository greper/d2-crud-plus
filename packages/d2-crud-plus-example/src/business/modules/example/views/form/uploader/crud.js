export const crudOptions = (vm) => {
  return {
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
        form: {
          component: {
            props: {
              elProps: { // 与el-uploader 配置一致
                multiple: true,
                limit: 5 // 限制5个文件
              },
              sizeLimit: 50 * 1024 // 不能超过限制
            }
          },
          helper: '默认腾讯云cos上传,限制文件大小不能超过50k'
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
          }
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
                onPreview: (file) => { // 自定义点击事件
                  window.open(file.url)
                },
                limit: 0 // 不限制数量
              },
              uploader: {
                // action: 'http://d2p.veryreader.com:7070/api/upload/form/upload',
                custom: {
                  keepName: true // 保持文件名，注意：中文及特殊符号文件名在ios上支持不是很好
                }
              }
            },
            span: 20
          },
          helper: {
            slot: true
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
        title: '本地服务器',
        key: 'formAvatar',
        sortable: true,
        type: 'avatar-uploader',
        width: 130,
        form: {
          component: {
            props: {
              uploader: {
                type: 'form',
                custom: {
                  keepName: false
                }
              }
            },
            span: 24
          },
          helper: 'form表单上传'
        }
      }
    ]
  }
}
