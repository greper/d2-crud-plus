# d2p-file-uploader

## Props

<!-- @vuese:d2p-file-uploader:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|btnSize|选择文件按钮的大小|—|`false`|'small'|
|btnName|选择文件按钮的名称|—|`false`|'选择文件'|
|accept|可选哪些类型的文件|—|`false`|-|
|type|上传后端类型，[cos,qiniu,alioss,form]|`String`|`false`|'cos'|
|value|值 <br/>'url'<br/>或 ['url1','url2']<br/>或 {url:'url',md5:'',size:number}<br/>或 [{url:'url',md5:'',size:number}]<br/><br/>limit=1 时 input事件返回 {url:'url',md5:'',size:number}<br/>limit>1 时 input事件返回 [{url:'url',md5:'',size:number}]<br/>|`String` / `Array` / `Object`|`false`|-|
|suffix|样式后缀 追加到url的后面，进行图片处理，需要到对象存储平台配置样式|`String`|`false`|-|
|returnType|返回类型: url=仅返回链接, object=包含md5和size|`String`|`false`|'url'|
|custom|自定义参数|`Object`|`false`|-|
|elProps|内部封装[el-upload](https://element.eleme.cn/#/zh-CN/component/upload)组件的属性参数注意，form方式上传的action、name、headers等参数不在此设置|`Object`|`false`|-|
|uploader|上传组件参数，会临时覆盖全局上传配置参数[d2p-uploader](/guide/extends/uploader.html)|`Object`|`false`|-|

<!-- @vuese:d2p-file-uploader:props:end -->


## Events

<!-- @vuese:d2p-file-uploader:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|success|-|-|
|input|-|-|
|change|-|-|

<!-- @vuese:d2p-file-uploader:events:end -->


