import * as qiniu from 'qiniu-js'
import lodash from 'lodash'
let tokenCache = null
/**
config {
  getToken(custom,fileName),
  domain:xxx,
  buildKey(fileName, custom),
  custom:{},
  putConfig:{
       useCdnDomain: 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
       disableStatisticsReport: 是否禁用日志报告，为布尔值，默认为false。
       region: 选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域
       retryCount: 上传自动重试次数（整体重试次数，而不是某个分片的重试次数）；默认 3 次（即上传失败后最多重试两次）；目前仅在上传过程中产生 599 内部错误时生效，但是未来很可能会扩展为支持更多的情况。
       concurrentRequestLimit: 分片上传的并发请求量，number，默认为3；因为浏览器本身也会限制最大并发量，所以最大并发量与浏览器有关。
       checkByMD5: 是否开启 MD5 校验，为布尔值；在断点续传时，开启 MD5 校验会将已上传的分片与当前分片进行 MD5 值比对，若不一致，则重传该分片，避免使用错误的分片。读取分片内容并计算 MD5 需要花费一定的时间，因此会稍微增加断点续传时的耗时，默认为 false，不开启。
  },
  putExtra:{

  }
 }
 */
function getToken (fileName, config) {
  let noCache = true // 七牛更新后，token不支持多次复用了
  if (noCache || tokenCache == null || new Date().getTime() >= tokenCache.expiresTime) {
    return config.getToken(config.custom, fileName).then(ret => {
      let token = null
      if (typeof (ret) === 'string') {
        token = { token: ret, expires: 3600 }
      } else {
        token = ret
      }
      tokenCache = token
      tokenCache.expiresTime = new Date().getTime() + (tokenCache.expires * 1000)
      return tokenCache.token
    })
  } else {
    return new Promise(resolve => {
      return tokenCache.token
    })
  }
}
function getKey (fileName, config) {
  let key = config.buildKey(fileName, config.custom)
  if (typeof (key) === 'string') {
    return new Promise((resolve) => {
      resolve(key)
    })
  } else {
    return key
  }
}
export default {
  options: undefined,
  init (options) {
    this.options = options
  },
  async upload ({ file, fileName, onProgress, onError, config }) {
    let options = lodash.cloneDeep(this.options)
    lodash.merge(options, config)
    config = options
    console.log('-----------开始上传----------', fileName, config)
    let key = await getKey(fileName, config)
    let token = await getToken(fileName, config)

    return new Promise((resolve, reject) => {
      /**
       */
      let observable = qiniu.upload(file, key, token, config.putExtra, config.putConfig)
      // eslint-disable-next-line no-unused-vars
      let subscription = observable.subscribe({
        next (res) {
          onProgress(res)
        },
        error (err) {
          onError(err)
          reject(err)
        },
        complete (res) {
          resolve({ url: config.domain + '/' + key, key: key })
        }
      }) // 上传开始
      // subscription.unsubscribe() // 上传取消
    })
  }
}
