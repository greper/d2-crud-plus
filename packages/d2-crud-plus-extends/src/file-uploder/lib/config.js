export default {
  defaultType: 'cos', // 默认的上传后端类型
  cos: { // 腾讯云 cos 的配置
    domain: 'https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com',
    bucket: 'd2p-demo-1251260344',
    region: '',
    secretId: '', //
    secretKey: '', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
    getAuthorization: null // 不传secretKey代表使用临时签名模式时，此参数必传（安全，生产环境推荐）
  },
  alioss: {
    domain: 'https://d2p-demo.oss-cn-shenzhen.aliyuncs.com',
    bucket: 'd2p-demo',
    region: 'oss-cn-shenzhen',
    secretId: '',
    secretKey: '', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
    getAuthorization (custom) { // 不传secretKey代表使用临时签名模式时（安全）
      return new Promise((resolve, reject) => {
        reject(new Error('请实现config.alioss.getAuthorization，返回Promise获取临时授权token'))
      })
    }
  },
  qiniu: {
    bucket: 'd2p-demo',
    getToken (custom, fileType) {
      return new Promise((resolve, reject) => {
        reject(new Error('请实现config.qiniu.getToken方法，返回Promise获取七牛的授权token{token:xxx,expires:xxx}'))
      })
    },
    domain: 'http://pzrsldiu3.bkt.clouddn.com'
  },
  buildKey (fileName, custom, context) { // 文件key的构建规则
    const date = new Date()
    let fileType = 'file'
    if (custom != null && custom.fileType != null) {
      fileType = custom.fileType
    }
    return fileType + '/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + Math.floor(Math.random() * 1000000000000) + '-' + fileName
  }
}
