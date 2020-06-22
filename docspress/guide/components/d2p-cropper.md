# d2p-cropper

## Props

<!-- @vuese:d2p-cropper:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|对话框标题|`String`|`false`|'图片裁剪'|
|cropperHeight|cropper的高度，默认为浏览器可视窗口高度的40%，最小270|`String` / `Number`|`false`|-|
|dialogWidth|对话框宽度，默认50%|`String` / `Number`|`false`|'50%'|
|maxSize|图片大小限制，单位MB，0为不限制|`Number`|`false`|5|
|uploadTip|上传提示|`String`|`false`|-|
|cropper|cropperjs的参数，详见：https://github.com/fengyuanchen/cropperjs|`Object`|`false`|-|
|accept|可接收的文件后缀|`String`|`false`|'.jpg, .jpeg, .png, .gif, .webp'|
|output|输出类型，blob,dataUrl,all|`String`|`false`|'blob'|

<!-- @vuese:d2p-cropper:props:end -->


## Events

<!-- @vuese:d2p-cropper:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|cancel|-|-|
|done|-|-|

<!-- @vuese:d2p-cropper:events:end -->


