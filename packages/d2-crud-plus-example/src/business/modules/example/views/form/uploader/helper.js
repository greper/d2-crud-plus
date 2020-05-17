export default {
  init: `  import Vue from 'vue'
  import d2Crud from 'd2-crud-x'
  import { d2CrudPlus } from 'd2-crud-plus'
  import { D2pFileUploader ,D2pUploader} from 'd2p-extends'

  Vue.use(D2pFileUploader)
  // 安装扩展插件
  Vue.use(D2pUploader, {
    defaultType: 'cos', //默认使用腾讯云
    cos: { //腾讯云cos配置
      domain: 'https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com',
      bucket: 'd2p-demo-1251260344',
      region: 'ap-guangzhou',
      secretId: '', //
      secretKey: '', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
      getAuthorization  (custom) { // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
        return request({ //请求后端获取sts授权
          url: '/upload/cos/getAuthorization',
          method: 'get'
        }).then(ret => {
          // 返回结构如下
          // ret.data:{
          //   TmpSecretId,
          //   TmpSecretKey,
          //   XCosSecurityToken,
          //   ExpiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
          // }
          return ret.data
        })
      }
    },
    alioss: { //阿里云oss配置
      domain: 'https://d2p-demo.oss-cn-shenzhen.aliyuncs.com',
      bucket: 'd2p-demo',
      region: 'oss-cn-shenzhen',
      accessKeyId: '',
      accessKeySecret: '',
      getAuthorization  (custom, context) { // 不传accessKeySecret代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
        return request({ //请求后端获取sts授权
          url: '/upload/alioss/getAuthorization',
          method: 'get'
        }).then(ret => {
          return ret.data
        })
      }
    },
    qiniu: {
      bucket: 'd2p-demo',
      getToken (custom) {
        return request({ //请求后端获取token
          url: '/upload/qiniu/getToken',
          method: 'get'
        }).then(ret => {
          return ret.data // {token:xxx,expires:xxx}
        })
      },
      domain: 'http://pzrsldiu3.bkt.clouddn.com'
    },
    form:{
      action: '上传url',
      name: 'file', //上传文件的参数名
    }
  })

  `,
  crud: `export const crudOptions = {
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
            suffix: '!200_200'
          },
          span: 24
        },
        helper: '这里演示的是阿里云文件上传,配置样式，居中裁剪成200x200方形图片'
      }
    }
  ]
}

`,
  template: `
  `
}
