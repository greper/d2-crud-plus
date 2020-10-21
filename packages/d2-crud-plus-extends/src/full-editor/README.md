## 富文本
示例地址：http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/editor

###  1. 引入   
```javascript
// 先引入d2-crud,d2-crud-plus
//引入富文本组件
import { D2pFullEditor } from 'd2p-extends'
Vue.use(D2pFullEditor)
```
#### 1.1 quill文件上传配置
```js
// 安装文件上传扩展插件，整个项目配置一次即可
// 支持quill的图片上传
Vue.use(D2pFileUploader, {
  ...
}
```

#### 1.2 ueditor安装
复制 `./packages/d2-crud-plus-example/public/lib/UEditor` 到你的项目中对应目录下

#### 1.3 ueditor上传配置
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
    }
  ]
}
```
###  3. 效果
 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/index.html#/demo/form/editor
 
### 4. 其他注意事项
#### 1.ueditor 安装

#### 2.ueditor 上传配置
```js

```

