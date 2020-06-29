
# 头像裁剪上传
将图片根据比例裁剪后上传   
[d2p-cropper-uploader组件详情](../components/d2p-cropper-uploader) 
## 准备
本扩展依赖d2p-uploader文件上传库   
请务必先安装配置好[d2p-uploader](./uploader.md)

## 引入
```javascript
import Vue from 'vue'
import d2Crud from 'd2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pFileUploader, D2pUploader } from 'd2p-extends'  //上传组件将会懒加载
// 引入d2Crud
Vue.use(d2Crud)
// 引入d2CrudPlus
Vue.use(d2CrudPlus)

// 安装文件上传lib，  
Vue.use(D2pUploader,{ //上传全局配置参数，具体配置参考[d2p-uploader]
        form:{},
        alioss:{},
        cos:{},
        qiniu:{}
    }) 
// 安装本扩展
Vue.use(D2pFileUploader, { d2CrudPlus })

```

## 使用
配置column.type=avatar-cropper 即可   

```javascript
export const crudOptions = {
  columns: [
    {
      title: '头像',
      key: 'avatar',
      type: 'avatar-cropper'
    }
  ]
}
```
## 参数说明
[更多d2p-cropper-uploader组件参数](../components/d2p-cropper-uploader) 
```javascript
export const crudOptions = {
    columns: [
    {
      title: '头像',
      key: 'avatar',
      type: 'avatar-cropper',
      width: 200,
      form: {
        component: {
          props: {
            limit: 1, //图片数量
            cropper:{
              // 裁剪组件 cropperjs 参数配置
              //https://github.com/fengyuanchen/cropperjs
              aspectRatio: 1 / 1 //图片裁剪比例
            } ,
            uploader:{
                // 上传临时配置，参考[d2p-uploader](./uploader.md)
            }
            // 更多请参考d2p-cropper-uploader组件参数配置
          }
        }
      }
    }  
  ]
 }
```
