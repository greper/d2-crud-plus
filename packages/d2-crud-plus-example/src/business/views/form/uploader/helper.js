export default {
  init: `  import Vue from 'vue'
  import d2Crud from 'd2-crud-x'
  import { d2CrudPlus } from 'd2-crud-plus'
  import { D2pFileUploader } from 'd2-crud-plus-extends'
  import request from '@/plugin/axios'
  Vue.use(D2pFileUploader, {
    d2CrudPlus,
    defaultType: 'cos',
    cos: {
      domain: 'https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com',
      bucket: 'd2p-demo-1251260344',
      region: 'ap-guangzhou',
      secretId: 'AKIDbz3tUqJn6D8tPeNJm22lJb9xWq0uqz8x', // 为了演示环境配置了真实的secretId与secretKey，请大家遵守规则，切勿泄漏
      secretKey: 'kFVWFhwve7KGwMUQ6XrypRmphKgnkQIx', // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
      getAuthorization  (options, callback) { // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
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
    },
    qiniu: {
      bucket: 'd2p-demo',
      getToken (custom) {
        if (qiniuToken == null) {
          return request({
            url: '/upload/qiniu/getToken',
            method: 'get'
          }).then(ret => {
            qiniuToken = ret.data
            return ret.data
          })
        } else {
          return new Promise(resolve => {
            resolve(qiniuToken)
          })
        }
      },
      domain: 'http://pzrsldiu3.bkt.clouddn.com'
    }
})

  `,
  crud: `export const crudOptions = {
  columns: [
    {
      title: '头像',
      key: 'avatar',
      type: 'avatar-uploader',
      width: 200,
      form: {
        valueChange (key, value, form) {
          console.log('valueResolve', value)
          if (value != null) {
            form.avatarSize = value.size
            form.avatarMd5 = value.md5
          }
        },
        helper: '上传后，右边将获取到头像大小和md5值'
      }
    },
    {
      title: '头像文件大小',
      key: 'avatarSize',
      width: 200
    },
    {
      title: '头像文件md5',
      key: 'avatarMd5',
      width: 200
    },
    {
      title: '图片',
      key: 'image',
      type: 'image-uploader',
      width: 200,
      form: {
        component: {
          props: {
            elProps: { // 与el-uploader 配置一致
              limit: 5 // 限制5个文件
            }
          },
          span: 24
        },
        helper: '默认腾讯云cos上传'
      }
    },
    {
      title: '文件',
      key: 'file',
      sortable: true,
      type: 'file-uploader',
      form: {
        component: {
          props: {
            elProps: {// element upload组件的props
              limit: 0 // 不限制数量
            }
          }
        }
      }
    },
    {
      title: '七牛',
      key: 'qiniuAvatar',
      sortable: true,
      type: 'avatar-uploader',
      form: {
        component: {
          props: {
            type: 'qiniu'
          }
        },
        helper: '这里演示的是七牛文件上传'
      }
    }
  ]
}

`,
  template: `
  `
}
