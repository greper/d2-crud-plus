
# 文件上传lib
【d2p-uploader】目前支持腾讯云cos、七牛、阿里云oss、等三种对象存储的web端直传，以及本地服务器form表单上传  
文件上传组件、头像裁剪组件、富文本等均依赖本上传lib
## 云上传准备【form表单上传无需此步骤】
 1. 创建相应的bucket，配置跨域访问等
 2. 生产环境还需配置获取相应的授权(以各平台上java为例)：
 * <a target="_blank" href="https://cloud.tencent.com/document/product/436/14048">腾讯云临时密钥</a>
 * <a target="_blank" href="https://help.aliyun.com/document_detail/100624.html">阿里云的sts</a>
 * <a target="_blank" href="https://developer.qiniu.com/kodo/sdk/1239/java#simple-uptoken">七牛获取token</a>
 * 后端实现参考：https://github.com/greper/d2-crud-plus-server.git
## 引入
```javascript
import Vue from 'vue'
import { D2pUploader } from 'd2p-extends'  //组件将会懒加载
import { request } from '@/api/service'

// 配置上传参数
Vue.use(D2pUploader, {
  defaultType: 'cos', //默认类型为腾讯云上传，可选值：【cos、qiniu、alioss、form】
  cos: {
    domain: 'https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com',
    bucket: 'd2p-demo-1251260344',
    region: 'ap-guangzhou',
    secretId: '', //
    secretKey: '', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
    getAuthorization  (custom,context) { // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
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
  alioss: {
    domain: 'https://d2p-demo.oss-cn-shenzhen.aliyuncs.com',
    bucket: 'd2p-demo',
    region: 'oss-cn-shenzhen',
    accessKeyId: '',
    accessKeySecret: '',
    getAuthorization  (custom) { // 不传accessKeySecret代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
      return request({ //请求后端获取sts授权
        url: '/upload/alioss/getAuthorization',
        method: 'get'
      }).then(ret => {
       // ret.data:{
       //   securityToken,
       //   accessKeySecret,
       //   accessKeyId,
       //   expiration
       // }
        return ret.data
      })
    }
  },
  qiniu: { //七牛上传
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
  form: { //本地服务端上传
    action: '', //上传url
    name:'file', //上传时文件的参数名
    data:{}, //上传附加参数
    headers:{} //上传请求头
  }
   // ,buildKey(){} //key生成规则方法
})

```


## 使用
文件上传组件、头像裁剪组件、富文本等均依赖本lib
本lib配置好之后，这些组件均支持文件上传功能，直接使用这些组件即可

如果需要临时覆盖全局上传参数，可以在props中传入uploader:{}即可
```javascript
export const crudOptions = {
  columns: [
    {
      title: '头像',
      key: 'avatar',
      type: 'avatar-uploader',
      form: {
        component: {
            props:{
                uploader:{
                    type: 'form', //临时修改上传后端为form方式
                    action: 'xxx', // 临时修改form表单上传url
                }   
            }
        }   
      }   
    }
  ]
}
```
## 文件名保持
默认会将文件名改成随机字符串，因为某些特殊符号命名的图片在ios上无法显示，随机字符串的文件名在各类云端支持都比较好。  
但某些情况下需要保持住上传的文件名，您可以按如下配置。   
或者重写buildKey方法。   
全局配置
```js
{
    cos:{
       custom:{
           keepName: true
       }
    },
    alioss:{
        custom:{
            keepName: true
         }
    },
    form:{...}
    qiniu:{...}
}
```

临时配置
```js
export const crudOptions = {
  columns: [
    {
      form: {
        component: {
            props:{
                uploader:{
                    custom: {
                        keepName: true //文件名保持，该参数默认为false，将会给文件名改成随机字符串
                    }
                }   
            }
        }   
      }   
    }
  ]
}
```

## 默认全局配置参考
 
<<< @/packages/d2-crud-plus-extends/src/uploader/config.js

