import Vue from 'vue'
import d2Crud from '@d2-projects/d2-crud'
import d2CrudX from 'd2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pAreaSelector, D2pFileUploader, D2pIconSelector, D2pTreeSelector, D2pFullEditor, D2pUploader, D2pDemoExtend } from 'd2p-extends' // 源码方式引入，上传组件支持懒加载
// http请求
import { request, requestForMock } from '@/api/service'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable)

// 按如下重命名引入可与官方版共存，index.vue中标签用<d2-crud-x /> = 使用加强版，标签用<d2-crud/> = 使用官方版
Vue.use(d2CrudX, { name: 'd2-crud-x' })

// 官方版【此处为演示与官方版共存而引入，实际项目中可以用d2-crud-x完全替代官方版】
Vue.use(d2Crud)

// 引入d2CrudPlus
Vue.use(d2CrudPlus, {
  getRemoteDictFunc (url, dict) {
    // 此处配置你的字典http请求方法
    // 实际使用请改成request
    return requestForMock({
      url: url,
      method: 'get'
    }).then(ret => {
      return ret.data
    })
  },
  commonOption () { // 公共配置
    return {
      format: {
        page: { // page接口返回的数据结构配置，
          request: {
            current: 'current',
            size: 'size'
          },
          response: {
            current: 'current', // 当前页码 ret.data.current
            size: (data) => { return data.size }, // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'records' // 列表数组 ret.data.records
          }
        }
      },
      pageOptions: {
        compact: true
      },
      options: {
        size: 'small'
      },
      formOptions: {
        defaultSpan: 12 // 默认的表单 span
      },
      pagination: {
        background: true
      }
    }
  }
})

// 安装扩展插件
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
Vue.use(D2pIconSelector)
Vue.use(D2pFullEditor, {
  ueditor: {
    serverUrl: '/api/ueditor/'
  }
})
Vue.use(D2pDemoExtend)
Vue.use(D2pFileUploader)
Vue.use(D2pUploader, {
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
  },
  form: {
    action: process.env.VUE_APP_API + 'upload/form/upload',
    name: 'file'
  }
})

//  自定义字段类型示例
d2CrudPlus.util.columnResolve.addTypes({
  time2: {
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
