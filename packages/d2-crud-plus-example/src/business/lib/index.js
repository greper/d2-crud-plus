import Vue from 'vue'
import d2Crud from 'd2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pAreaSelector, D2pFileUploader, D2pTreeSelector } from 'd2p-extends/src' // 源码方式引入，上传组件支持懒加载
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
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
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
    domain: 'http://d2p.file.veryreader.com'
  }
})

//  自定义字段类型示例
d2CrudPlus.util.columnResolve.addTypes({
  'time2': {
    form: { component: { name: 'el-date-picker', props: { type: 'datetime' } } }, // 编辑时支持日期时间
    search: { component: { props: { type: 'date' } } }, // 搜索时只支持日期
    formatter (row, column, value, index) {
      return value + '-->我是自定义字段类型：time2'
    },
    _handle (column) {
      //  此方法主要将column中某些依赖的用户配置的属性放到默认配置中，比如数据字典的配置
      if (column.dict != null) {
        this.form.component.props.dict = column.dict
        this.component.props.dict = column.dict
      }
    }
  }
})
