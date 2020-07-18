# d2p-ueditor

## Props

<!-- @vuese:d2p-ueditor:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|富文本|`String`|`false`|''|
|config|编辑器配置请参考：http://fex.baidu.com/ueditor/#start-config|`Object`|`false`|[object Object]|
|name|编辑器名称|`String`|`false`|''|

<!-- @vuese:d2p-ueditor:props:end -->


## Events

<!-- @vuese:d2p-ueditor:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|-|-|
|input|-|-|
|beforeInit|这么做是为了支持 Vue SSR，因为如果把 id 属性放在 data 里会导致服务端和客户端分别计算该属性的值，而造成 id 不匹配无法初始化的 BUG|-|
|ready|-|-|

<!-- @vuese:d2p-ueditor:events:end -->


