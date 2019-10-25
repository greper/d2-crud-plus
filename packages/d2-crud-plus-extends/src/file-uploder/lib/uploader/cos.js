import config from '../config'
// 初始化实例
import COS from 'cos-js-sdk-v5'

let cos = null
if (config.cos.secretId != null && config.cos.secretId !== '' && config.cos.secretKey != null && config.cos.secretKey !== '') {
  cos = new COS({
    SecretId: config.cos.secretId,
    SecretKey: config.cos.secretKey
  })
} else {
  cos = new COS({
    // 必选参数
    getAuthorization (options, callback) { // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
      config.cos.getAuthorization(options).then(data => {
        // eslint-disable-next-line standard/no-callback-literal
        callback(data)
      })
    }
  })
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
  },
  doUpload (option, custom, context) {
    // TODO 大文件需要分片上传
    let file = option.file
    let key = context.key
    return new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: config.cos.bucket,
        Region: config.cos.region,
        Key: key,
        Body: file,
        onProgress (progressEvent) {
          console.log('progressEvent', progressEvent)
          let e = progressEvent
          if (e.total > 0) {
            e.percent = e.loaded / e.total * 100
          }
          option.onProgress(e)
        }
      }, function (err, data) {
        console.log(err || data)
        if (err != null) {
          option.onError(err)
          console.log(err)
          reject(err)
        } else {
          console.log('上传成功', data)
          let result = { url: config.cos.domain + '/' + key }
          resolve(result)
        }
      })
    })
  }
}
