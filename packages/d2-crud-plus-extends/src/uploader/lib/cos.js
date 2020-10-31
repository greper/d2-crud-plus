// 初始化实例
import COS from 'cos-js-sdk-v5'
import lodash from 'lodash'

function newClient (options) {
  let client = null
  const secretId = options.secretId
  const secretKey = options.secretKey
  const getAuthorization = options.getAuthorization
  if (secretId != null && secretId !== '' && secretKey != null && secretKey !== '') {
    client = new COS({
      SecretId: secretId,
      SecretKey: secretKey
    })
  } else {
    client = new COS({
      // 必选参数
      getAuthorization (options, callback) { // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
        getAuthorization(options).then(data => {
          // eslint-disable-next-line standard/no-callback-literal
          callback(data)
        })
      }
    })
  }
  return client
}
/**
 * config {
      getToken(custom,fileName),
      buildKey(fileName, custom),
      custom:{},
      domain:xxx,
      bucket,
      region,
      secretId,
      secretKey,
      getAuthorization()
    }
 */
export default {
  client: undefined,
  options: undefined,
  init (options) {
    this.options = options
    this.client = newClient(options)
  },
  getClient () {
    return this.client
  },
  async upload ({ file, fileName, onProgress, onError, config }) {
    const options = lodash.cloneDeep(this.options)
    lodash.merge(options, config)
    config = options
    console.log('-----------开始上传----------', fileName)
    let key = config.buildKey(fileName, {
      file,
      ...(config.custom || {})
    })
    if (key instanceof Promise) {
      key = await key
    }
    // TODO 大文件需要分片上传
    const cos = this.getClient()
    return new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: config.bucket,
        Region: config.region,
        Key: key,
        Body: file,
        onProgress (progressEvent) {
          const e = progressEvent
          if (e.total > 0) {
            e.percent = e.loaded / e.total * 100
          }
          onProgress(e)
        }
      }, function (err, data) {
        if (err != null) {
          onError(err)
          console.log(err)
          reject(err)
        } else {
          console.log('上传成功', data)
          const result = { url: config.domain + '/' + key, key: key }
          resolve(result)
        }
      })
    })
  }
}
