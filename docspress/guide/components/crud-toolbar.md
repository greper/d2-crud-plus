# crud-toolbar

## Props

<!-- @vuese:crud-toolbar:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|search|是否显示查询传null，则不显示按钮|`Boolean`|`false`|undefined|
|refresh|是否显示刷新|`Boolean`|`false`|true|
|compact|是否显示紧凑模式|`Boolean`|`false`|undefined|
|columns|列配置|`Array`|`false`|undefined|
|storage|是否保存用户列设置传string则表示传入缓存的主key|`String` / `Boolean`|`false`|true|

<!-- @vuese:crud-toolbar:props:end -->


## Events

<!-- @vuese:crud-toolbar:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|refresh|-|-|
|update:search|-|-|
|update:compact|-|-|
|columns-filter-changed|-|-|

<!-- @vuese:crud-toolbar:events:end -->


