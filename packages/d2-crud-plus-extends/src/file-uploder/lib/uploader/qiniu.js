import config from '../config'
import * as qiniu from 'qiniu-js'
let tokenCache = null

function getToken (custom, context) {
  if (tokenCache == null || new Date().getTime() >= tokenCache.expiresTime) {
    return config.qiniu.getToken(custom, context).then(ret => {
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
  beforeUpload (file, custom) {
    let fileName = file.name
    console.log('-----------开始上传----------', fileName)
    return getKey(file, custom).then(context => {
      return getToken(custom, context).then(token => {
        context.token = token
        return context
      })
    })
  },
  doUpload (option, custom, context) {
    let file = option.file
    let token = context.token
    let key = context.key
    return new Promise((resolve, reject) => {
      let observable = qiniu.upload(file, key, token, custom, config)
      // eslint-disable-next-line no-unused-vars
      let subscription = observable.subscribe({
        next (res) {
          option.onProgress(res)
        },
        error (err) {
          option.onError(err)
          reject(err)
        },
        complete (res) {
          resolve({ url: config.qiniu.domain + '/' + key })
        }
      }) // 上传开始
      // subscription.unsubscribe() // 上传取消
    })
  }
}
