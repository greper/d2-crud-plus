import config from '../config'
// 初始化实例
import COS from 'cos-js-sdk-v5'

let cos = null
if (config.cos.secretId && config.cos.secretKey != null) {
  cos = new COS({
    SecretId: config.cos.secretId,
    SecretKey: config.cos.secretKey
  })
} else {
  cos = new COS({
    // 必选参数
    getAuthorization: config.cos.getAuthorizationFunc
  })
}

export default {
  beforeUpload (parent, file, fileType) {
    let fileName = file.name
    console.log('-----------开始上传----------', fileName)
    return null
  },
  doUpload (parent, option) {
    // TODO 大文件需要分片上传
    let file = option.file
    let key = config.buildKey(parent.fileType, file.name)
    return new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: config.cos.bucket,
        Region: config.cos.region,
        Key: key,
        Body: file,
        onProgress (progressEvent) {
          console.log(progressEvent)
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
