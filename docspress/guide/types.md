# 字段类型列表

此处列出目前支持的全部字段类型

## 文本输入框
不配置type，默认即是文本输入框

## Element包装组件
以下字段类型的组件包装过ElementUI的某个组件
被包装的element组件的参数一般通过component.props.elProps来配置
### 选择框
* 字段类型
select | radio | checkbox  
  
<<<@/packages/d2-crud-plus/src/lib/types/list/select.js

* 相关组件参数：
    * [dict-select](./components/dict-select)  
    * [dict-radio](./components/dict-radio)  
    * [dict-checkbox](./components/dict-checkbox)  
    * [values-format](./components/values-format)
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/select>   
* 配置示例说明：
    * 表单组件dict-select 内部封装了el-select：[el-select](https://element.eleme.cn/#/zh-CN/component/select)
    * el-select的参数需要配置在component.props.elProps下
```javascript
let column={
   type: 'select',
   form: {
     component: { 
       name:'dict-select',
       props: {
         separator: ',' ,//多选时，value的分隔符
         elProps:{ // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
           filterable: true,
           multiple: true,
           clearable: true
         }            
       }    
     }
   },
   component:{
     name:'values-format',
     props:{
       multiple:true, //默认支持多选
       separator: ',' ,//多选时，value的分隔符
     }   
   }
}

```


### 级联

* 类型  
type = cascader （单选）| cascader-multi（多选）

<<< @/packages/d2-crud-plus/src/lib/types/list/cascade.js

* 相关组件：
    * [cascader-select](./components/dict-select)  
    * [cascader-format](./components/values-format)
* 示例： 
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/select>




## 扩展组件
### 国际电话
* 类型 
type=phoneNumber
     
<<<@/packages/d2-crud-plus/src/lib/types/list/phone.js

* 相关组件：
    * [el-phone-number-input](https://github.com/greper/el-phone-number-input)  
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/phone>



### 省市区选择
* 类型名称     
 type = area-selector （级联选择） | area-multi-selector （级联多选） | area-tree-selector （树形选择）
 
<<< @/packages/d2-crud-plus-extends/src/area-selector/types.js
* 相关组件：
  * [cascade-select](components/cascade-select.md)
  * [cascade-format](components/cascade-format.md)
* 示例地址：
  * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/area>


### 树形选择
* 类型名称  
type = tree-selector 

<<< @/packages/d2-crud-plus-extends/src/tree-selector/types.js

* 相关组件：
    * [d2p-tree-selector安装](extends/tree-selector.md)
    * [d2p-tree-selector参数](components/d2p-tree-selector.md)
            
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/area>


### 文件上传，裁剪上传
* 类型
    *  file-uploader（文件上传） | image-uploader（图片上传） | avatar-uploader（头像上传，单图片）  
    *  avatar-cropper (头像裁剪上传)
    
<<< @/packages/d2-crud-plus-extends/src/file-uploader/types.js
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/uploader>
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/cropper>

* 相关组件文档：
    * [D2pUploader安装](extends/uploader.md)  
    * [D2pFileUploader安装](extends/file-uploader.md)  
    * [D2pCropperUploader安装](extends/file-uploader.md)  
    * [d2p-file-uploader](components/d2p-file-uploader.md) 
    * [d2p-cropper-uploader](components/d2p-cropper-uploader.md) 
    * [d2p-cropper](components/d2p-cropper.md)  
    * [d2p-images-format](components/d2p-images-format.md)
    * [d2p-files-format](components/d2p-files-format.md)

### 图标选择器
* 类型名称  
type = icon-selector 

<<< @/packages/d2-crud-plus-extends/src/icon-selector/types.js

* 相关组件：
    * [D2pIconSelector安装](extends/icon-selector.md)
    * [d2p-icon-select](components/d2p-icon-select.md)
    * [d2p-icon](components/d2p-icon.md)
                    
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/icon>


### 富文本框
* 类型   
   * type= editor-quill
   
<<< @/packages/d2-crud-plus-extends/src/full-editor/types.js

* 相关组件：
  * [d2p-quill](extends/file-uploader.md) 
  
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/editor>


## ElementUI组件
以下字段类型对应的组件为ElementUI的相应组件   
直接在component.props中配置ElementUI组件的属性即可实现定制化

### 日期时间选择
* type = datetime | date | time | daterange | datetimerange

<<<@/packages/d2-crud-plus/src/lib/types/list/form.js

* 相关组件：
    * [el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)  
    * [el-time-picker](https://element.eleme.cn/#/zh-CN/component/time-picker)  
    * [date-format](./components/date-format)
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/date>
    
## 其他el组件
* 类型

<<< @/packages/d2-crud-plus/src/lib/types/list/el.js
### 数字输入
* type = number
* 表单组件：
    * [el-input-number](https://element.eleme.cn/#/zh-CN/component/input-number)
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/el>  
### 开关
* type = switch
* 相关组件：
    * [el-switch](https://element.eleme.cn/#/zh-CN/component/switch)
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/el>  
### 滑动条
* type = slider
* 相关组件：
    * [el-slider](https://element.eleme.cn/#/zh-CN/component/slider)  
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/el>
### 评分
* type = rate
* 相关组件：
    * [el-rate](https://element.eleme.cn/#/zh-CN/component/rate)  
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/el>
### 颜色
* type = color-picker
* 相关组件：
    * [el-color-picker](https://element.eleme.cn/#/zh-CN/component/color-picker)  
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/el>
    
### 穿梭框
* type = transfer 
* 相关组件:
    * [el-transfer](https://element.eleme.cn/2.0/#/zh-CN/component/transfer)  
* 示例：
    * <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/demo/form/el>




## slot自定义快捷字段类型
* type = slot （表单以及行展示组件需要通过slot自定义）
* type = slot-all （表单、行展示组件、查询组件均需要通过slot自定义）
* type = slot-form （仅表单组件需要通过slot自定义）
* 更多详情请看 [slot自定义表单功能](./slot)
* 对应默认配置  

<<< @/packages/d2-crud-plus/src/lib/types/list/slot.js
