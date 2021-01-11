# d2p-tree-selector

## Props

<!-- @vuese:d2p-tree-selector:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|值|`Number` / `String` / `Boolean` / `Array` / `Object`|`false`|-|
|filter|过滤，value中的nodes过滤方法 参数为nodes|`Function`|`false`|-|
|filterPlaceholder|过滤的placeholder|`String`|`false`|'输入关键字进行过滤'|
|dialogTitle|-|`String`|`false`|'选择'|
|cancelText|-|`String`|`false`|'取消'|
|confirmText|-|`String`|`false`|'确定'|
|treeFilter|树形组件节点过滤，可以配置elProps.filterNodeMethod ，覆盖默认的过滤方法|`Boolean`|`false`|true|
|multiple|是否多选，传入false为单选|`Boolean`|`false`|true|
|ignoreFullCheckedChildren|是否忽略选中节点的子节点|`Boolean`|`false`|true|
|leafOnly|是否只返回叶子节点|`Boolean`|`false`|false|
|includeHalfChecked|是否包含半选节点|`Boolean`|`false`|false|
|elProps|el-tree的属性配置|`Object`|`false`|-|
|clearable|是否可以清除|`Boolean`|`false`|true|
|dict|数据字典配置|`Object`|`false`|-|

<!-- @vuese:d2p-tree-selector:props:end -->


## Events

<!-- @vuese:d2p-tree-selector:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|-|-|
|check-change|-|-|
|current-change|-|-|
|input|-|-|

<!-- @vuese:d2p-tree-selector:events:end -->


