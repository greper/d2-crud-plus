
# 文件上传组件
目前支持腾讯云cos、七牛、阿里云oss等三种对象存储的web端直传,以及本地服务器的form表单上传  
[d2p-file-uploader组件详情](../components/d2p-file-uploader) 
## 准备
本扩展依赖d2p-uploader文件上传库   
请务必先安装配置好[d2p-uploader](./uploader.md)


## 引入
```javascript
import Vue from 'vue'
import d2Crud from 'd2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pFileUploader, D2pUploader } from 'd2p-extends'  //上传组件将会懒加载
import { request } from '@/api/service'
// 引入d2Crud
Vue.use(d2Crud)
// 引入d2CrudPlus
Vue.use(d2CrudPlus)

// 安装文件上传lib，  
Vue.use(D2pUploader,{ //上传全局配置参数，具体配置参考[d2p-uploader](http://greper.gitee.io/d2-crud-plus/guide/extends/uploader.html)
        form:{},
        alioss:{},
        cos:{},
        qiniu:{}
    }) 
// 安装本扩展
Vue.use(D2pFileUploader, { d2CrudPlus })

```

## 使用
配置type=avatar-uploader 即可   
type可选值：【avatar-uploader（头像上传） / image-uploader（多图片上传） / file-uploader（多文件上传）】

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
## 参数说明
[参考d2p-file-uploader组件详情](../components/d2p-file-uploader) 
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
            suffix: '!200_200', //url后缀，用于图片样式处理，需要到对象存储平台配置样式
            type: 'cos', // 当前使用哪种存储后端【cos/qiniu/alioss/form】
            elProps: { // 与el-uploader配置一致
              limit: 1 // 限制上传文件数量
            },
            uploader:{ 
               // uploader参数，将临时覆盖uploader的全局配置
               // 具体配置请参考 [d2p-uploader](http://greper.gitee.io/d2-crud-plus/guide/extends/uploader.html)
               type: 'cos', //与上方type作用一致，配置一个即可
               custom:{}, //自定义参数，可以在获取token、sts时传入不同的参数给后端
               ... //其他uploader参数
            }       
          }
        }
      }
    }  
  ]
 }
```

上传参数配置：[d2p-uploader](http://greper.gitee.io/d2-crud-plus/guide/extends/uploader.html)
