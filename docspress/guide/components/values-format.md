# values-format

## Props

<!-- @vuese:values-format:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|值|—|`false`|-|
|multiple|是否多选|—|`false`|true|
|separator|value的分隔符<br/>多选时，如果value为string，则以该分隔符分割成多个展示<br/>传入空字符串，表示不分割<br/>|—|`false`|','|
|dict|数据字典|`Object`|`false`|[object Object]|
|color|颜色，【auto, primary, success, warning, danger ,info】配置auto，则自动根据value值hashcode分配颜色值|—|`false`|'primary'|
|autoColors|自动颜色列表，【 primary, success, warning, danger 】|`Array`|`false`|-|
|autoEffects|自动主题列表，【 light, plain 】|`Array`|`false`|-|
|type|展示类型【text, tag】|—|`false`|'tag'|
|changeReload|valuechange 是否reload|—|`false`|undefined|

<!-- @vuese:values-format:props:end -->


## Events

<!-- @vuese:values-format:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|click|-|-|

<!-- @vuese:values-format:events:end -->


