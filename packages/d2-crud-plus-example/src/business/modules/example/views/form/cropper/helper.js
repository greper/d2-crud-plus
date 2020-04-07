export default {
  init: `  import Vue from 'vue'
  import d2Crud from 'd2-crud-x'
  import { d2CrudPlus } from 'd2-crud-plus'
  import { D2pFileUploader } from 'd2p-extends'
  // 安装扩展插件
Vue.use(D2pFileUploader, {
  d2CrudPlus,
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
  }
})

  `,
  crud: `export const crudOptions = {
  columns: [
    {
      title: '头像',
      key: 'avatar',
      type: 'avatar-cropper',
      width: 200,
      form: {
        props:{
          accept:'', // 支持的文件类型
          dialogWidth:'50%', //对话框宽度
          cropperHeight: '', //裁剪框高度，默认为浏览器视窗的40%
          cropper:{}, //裁剪组件参数，请参考https://github.com/fengyuanchen/cropperjs
          limit: 1, //限制数量，默认为1
          maxSize: 5, //限制单个文件大小，0为不限制
        }
      }
    }
  ]
}

`,
  template: `
  `
}
