import axios from 'axios'
function getAuthorization (options, callback) {
  // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
  // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
  // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
  axios.get('http://example.com/server/sts.php', {
    // 可从 options 取需要的参数
  }, function (data) {
    // eslint-disable-next-line standard/no-callback-literal
    callback({
      TmpSecretId: data.TmpSecretId,
      TmpSecretKey: data.TmpSecretKey,
      XCosSecurityToken: data.XCosSecurityToken,
      ExpiredTime: data.ExpiredTime // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
    })
  })
}
export default {
  cos: {
    domain: 'https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com',
    bucket: 'd2p-demo-1251260344',
    region: 'ap-guangzhou',
    secretId: 'AKIDbz3tUqJn6D8tPeNJm22lJb9xWq0uqz8x', //
    secretKey: 'kFVWFhwve7KGwMUQ6XrypRmphKgnkQIx', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
    getAuthorizationFunc: getAuthorization // 不传secretKey代表使用临时签名模式时，此参数必传（安全，生产环境推荐）
  },
  buildKey (fileType, fileName) {
    const date = new Date()
    return fileType + '/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + Math.floor(Math.random() * 1000000000000) + '-' + fileName
  }
}
