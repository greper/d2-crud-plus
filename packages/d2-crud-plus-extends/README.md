# d2-crud-plus-extends
自定义字段类型扩展模块   
目前支持：

## 1.支持的组件
### 1、file-uploader
#### 引入
```javascript
import Vue from 'vue'
import d2Crud from 'd2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pFileUploader } from 'd2p-extends'
import request from '@/plugin/axios'
// 引入d2Crud
Vue.use(d2Crud)
// 引入d2CrudPlus
Vue.use(d2CrudPlus, { getRemoteDictFunc (url) {
  return request({
    url: url,
    method: 'get'
  }).then(ret => {
    return ret.data
  })
}
})

// 安装扩展插件
Vue.use(D2pFileUploader, {
  d2CrudPlus,
  defaultType: 'cos',
  cos: {
    domain: 'https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com',
    bucket: 'd2p-demo-1251260344',
    region: 'ap-guangzhou',
    secretId: '', //
    secretKey: '', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
    getAuthorization  (custom) { // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
      return request({
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
    getAuthorization  (custom, context) { // 不传accessKeySecret代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
      return request({
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
      return request({
        url: '/upload/qiniu/getToken',
        method: 'get'
      }).then(ret => {
        return ret.data // {token:xxx,expires:xxx}
      })
    },
    domain: 'http://pzrsldiu3.bkt.clouddn.com'
  }
})

```
#### 使用
配置type=avatar-uploader 即可   
type可选值：【avatar-uploader / image-uploader / file-uploader】
不同的type应用场景不一样
```javascript
export const crudOptions = {
  columns: [
    {
      title: '头像',
      key: 'avatar',
      type: 'avatar-uploader'
    }
  ]
}
```
#### 参数说明

```javascript
export const crudOptions = {
    columns: [
    {
      title: '图片',
      key: 'image',
      type: 'image-uploader',
      width: 200,
      form: {
        component: {
          props: {
            btnSize: 'small', // type=file-uploader时按钮的大小
            btnName: '选择文件',// type=file-uploader时按钮文字
            accept: '.png', // 接受的文件后缀类型
            type: 'cos', // 当前使用哪种存储后端【cos/qiniu/alioss】
            custom:{}, //自定义参数，可以在获取token时传入不同的参数给后台
            elProps: { // 与el-uploader配置一致
              limit: 5 // 限制上传文件数量
            }
          }
        }
      }
    }  
  ]
 }
```

