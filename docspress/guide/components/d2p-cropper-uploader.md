# d2p-cropper-uploader

## Props

<!-- @vuese:d2p-cropper-uploader:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|初始图片url|`String` / `Array`|`false`|-|
|type|上传后端类型，[form, cos, qiniu , alioss]|`String`|`false`|-|
|uploadTip|上传提示|`String`|`false`|-|
|title|对话框标题|`String`|`false`|-|
|cropperHeight|cropper的高度，默认为浏览器可视窗口高度的40%，最小270|`String` / `Number`|`false`|-|
|dialogWidth|对话框宽度，默认50%|`String` / `Number`|`false`|'50%'|
|maxSize|图片大小限制，单位MB|`Number`|`false`|5|
|limit|图片数量限制,0为不限制|`Number`|`false`|1|
|accept|可接收的文件后缀|`String`|`false`|'.jpg, .jpeg, .png, .gif, .webp'|
|cropper|[cropperjs的参数](https://github.com/fengyuanchen/cropperjs)|`Object`|`false`|-|
|uploader|上传参数，会临时覆盖全局上传配置参数[d2p-uploader](/guide/extends/uploader.html)|`Object`|`false`|-|
|buildUrl|构建下载url方法,不影响提交的value|`Function`|`false`|function (value, item) {
  return typeof value === 'object' ? item.url : value;
}|

<!-- @vuese:d2p-cropper-uploader:props:end -->


## Events

<!-- @vuese:d2p-cropper-uploader:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|-|-|
|input|-|-|

<!-- @vuese:d2p-cropper-uploader:events:end -->


