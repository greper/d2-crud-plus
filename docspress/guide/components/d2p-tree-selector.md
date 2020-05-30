# d2p-tree-selector

树形选择组件，需要import xx from 'd2p-extends/src'

## Props

<!-- @vuese:d2p-tree-selector:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|值|`Number` /  `String` /  `Array` /  `Object`|`false`|-|
|filter|过滤，value中的nodes过滤方法 参数为nodes|`Function`|`false`|-|
|ignoreFullCheckedChildren|是否忽略选中节点的子节点|`Boolean`|`false`|-|
|leafOnly|是否只返回叶子节点|`Boolean`|`false`|-|
|includeHalfChecked|是否包含半选节点|`Boolean`|`false`|-|
|elProps|el-tree的属性配置|`Object`|`false`|-|
|dict|数据字典配置|`Object`|`false`|-|

<!-- @vuese:d2p-tree-selector:props:end -->


## Events

<!-- @vuese:d2p-tree-selector:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|
|change|-|-|

<!-- @vuese:d2p-tree-selector:events:end -->


