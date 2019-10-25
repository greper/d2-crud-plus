import config from '../config'
import OSS from 'ali-oss'
let sts = null

function getSts (custom) {
  if (sts == null || sts.expiresTime < new Date().getTime()) {
    // 需要重新获取sts
    return config.alioss.getAuthorization(custom).then(ret => {
      sts = ret
      sts.expiresTime = new Date().getTime() + parseInt(ret.expiration)
      return sts
    })
  } else {
    // 不需要重新获取
    return new Promise(resolve => {
      resolve(sts)
    })
  }
}

function getKey (file, custom) {
  let key = config.buildKey(file.name, custom)
  if (typeof (key) === 'string') {
    return new Promise((resolve) => {
      resolve({ key: key })
    })
  } else {
    return key.then(ret => {
      return { key: ret }
    })
  }
}
export default {
  /**
   *
   * @param parent
   * @param file
   * @param custom
   * @returns  返回context 的 promise
   */
  beforeUpload (file, custom) {
    let fileName = file.name
    console.log('-----------开始上传----------', fileName)
    return getKey(file, custom).then(context => {
      if (config.alioss.secretKey != null && config.alioss.secretKey !== '') {
        return context
      } else {
        return getSts(custom).then(sts => {
          context.sts = sts
          return context
        })
      }
    })
  },
  doUpload (option, custom, context) {
    console.log('doUpload:', option, custom, context)
    let file = option.file
    let key = context.key
    let sts = context.sts
    /**
     // ret.data:{
        // private String securityToken;
        // private String accessKeySecret;
        // private String accessKeyId;
        // private String expiration;
        // }
     */
    let client = null
    if (sts != null) {
      client = new OSS({
        region: config.alioss.region,
        accessKeyId: sts.accessKeyId,
        accessKeySecret: sts.accessKeySecret,
        stsToken: sts.securityToken,
        bucket: config.alioss.bucket
      })
    } else {
      client = new OSS({
        region: config.alioss.region,
        accessKeyId: config.alioss.accessKeyId,
        accessKeySecret: config.alioss.accessKeySecret,
        bucket: config.alioss.bucket
      })
    }
    return client.put(key, file).then((ret) => {
      console.log('alioss success', ret)
      let result = { url: config.alioss.domain + '/' + key }
      return result
    }).catch(err => {
      option.onError(err)
    })
    /**
     * onProgress (progressEvent) {
          console.log('progressEvent', progressEvent)
          let e = progressEvent
          if (e.total > 0) {
            e.percent = e.loaded / e.total * 100
          }
          option.onProgress(e)
        }
     */
  }
}
