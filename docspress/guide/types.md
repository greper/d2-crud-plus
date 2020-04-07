# 字段类型列表

此处列出目前支持的全部字段类型

## 文本输入框
不配置type，默认即是文本输入框

## Element包装组件
以下字段类型的组件包装过ElementUI的某个组件
被包装的element组件的参数一般通过component.props.elProps来配置
### 选择框
* type = select
* 表单组件：[dict-select](./components/dict-select)  
* 行组件：[values-format](./components/values-format)
* 示例： <http://localhost:8081/#/form/select>    
表单组件dict-select 内部封装了el-select：[el-select](https://element.eleme.cn/#/zh-CN/component/select)
el-select的参数需要配置在component.props.elProps下
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
* type = cascader （单选）| cascader-multi（多选）
* 表单组件：[cascader-select](./components/dict-select)  
* 行组件：[cascader-format](./components/values-format)
* 示例： <http://localhost:8081/#/form/select>




## 扩展组件
### 国际电话
* type=phoneNumber
* 表单组件：[el-phone-number-input](https://github.com/greper/el-phone-number-input)  
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/phone>
### 省市区级联选择
* type= area-selector | area-multi-selector
* 表单组件：cascade-select
* 行展示组件：cascade-format
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area>

### 省市区树形选择
* type = area-tree-selector | tree-selector 
* 表单组件：d2p-tree-selector 
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/area>

### 文件上传
* type= file-uploader（文件上传） | image-uploader（图片上传） | avatar-uploader（头像上传，单图片）
* 示例： <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/uploader>
### 图片裁剪上传
* type= avatar-cropper
* 示例： <http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/cropper>

## ElementUI组件
以下字段类型对应的组件为ElementUI的相应组件   
直接在component.props中配置ElementUI组件的属性即可实现定制化

### 日期选择
* type = datetime | date | daterange | datetimerange
* 表单组件：[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)  
* 行组件：[date-format](./components/date-format)
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/date>
### 时间选择
* type = time
* 表单组件：[el-time-picker](https://element.eleme.cn/#/zh-CN/component/time-picker)  
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/date>
### 数字输入
* type = number
* 表单组件：[el-input-number](https://element.eleme.cn/#/zh-CN/component/input-number)
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/el>  
### 开关
* type = switch
* 表单组件，行组件：[el-switch](https://element.eleme.cn/#/zh-CN/component/switch)
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/el>  
### 滑动条
* type = slider
* 表单组件：[el-slider](https://element.eleme.cn/#/zh-CN/component/slider)  
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/el>
### 评分
* type = rate
* 表单组件：[el-rate](https://element.eleme.cn/#/zh-CN/component/rate)  
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/el>
### 颜色
* type = color-picker
* 表单组件：[el-color-picker](https://element.eleme.cn/#/zh-CN/component/color-picker)  
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/el>
### 穿梭框
* type = transfer   
* 示例：<http://qiniu.veryreader.com/D2CrudPlusExample/index.html#/form/el>


## slot自定义快捷字段类型
* type = slot （表单以及行展示组件需要通过slot自定义）
* type = slot-all （表单、行展示组件、查询组件均需要通过slot自定义）
* type = slot-form （仅表单组件需要通过slot自定义）

更多详情请[slot自定义表单功能](./slot)
