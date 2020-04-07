
# 头像裁剪上传
将图片根据比例裁剪后上传
## 准备
 先配置好文件上传组件,[配置D2pFileUploader](./file-uploader) 
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
            } 
            // 更多请参考d2p-cropper-uploader组件参数配置
          }
        }
      }
    }  
  ]
 }
```
