## 富文本
示例地址：http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/editor

当前支持以下三种富文本编辑器：
* [quill](https://github.com/quilljs/quill)
* [ueditor](http://fex.baidu.com/ueditor/)
* [wangEditor](https://doc.wangeditor.com/) 
###  1. 引入   
```javascript
// 先引入d2-crud,d2-crud-plus
//引入富文本扩展组件
import { D2pFullEditor } from 'd2p-extends'
Vue.use(D2pFullEditor)
```
#### 1.1 如果使用quill 或 WangEditor
图片上传配置，需要依赖d2p-uploader
```js
// 安装文件上传扩展插件，整个项目配置一次即可
// 支持quill的图片上传
Vue.use(D2pUploader,{ //上传全局配置参数
    form:{},
    alioss:{},
    cos:{},
    qiniu:{}
}) 
```
文件上传详细配置参考[d2p-uploader](http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/extends/uploader.html)

#### 如果使用ueditor

##### ueditor安装
复制 `./packages/d2-crud-plus-example/public/lib/UEditor` 到你的项目中对应目录下

#####  ueditor上传配置
ueditor的上传配置无法使用d2p-uploader，只能按照示例配置    
后端实现参考：https://github.com/greper/d2-crud-plus-server.git

###  2. crud 
```javascript
export const crudOptions = {
  columns: [
    {
      title: 'Ueditor',
      key: 'ueditor',
      type: 'editor-ueditor',
      form: {
        component:{
          props:{
           config:{
             // 传入ueditor的配置
             // 文档参考： http://fex.baidu.com/ueditor/#start-config
           }   
         }
        }
      } 
    },
    {
      title: 'quill',
      key: 'quill',
      type: 'editor-quill',
      form: {
        component:{
          props:{
           uploader:{
             // 自定义你的上传配置
           }   
         }
        }
      } 
    }, {
          title: 'WangEditor',
          key: 'wang',
          type: 'editor-wang',
          form: {
              component:{
                  props:{
                      uploader:{
                          // 自定义你的上传配置
                      }
                  }
              }
          }
      }
  ]
}
```
###  3. 效果
 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/editor
 


