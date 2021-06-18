# dict-select

## Props

<!-- @vuese:dict-select:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|值|`Number` / `String` / `Boolean` / `Array`|`false`|-|
|separator|value的分隔符<br/>多选时，如果value为string，则以该分隔符分割成多个展示<br/>传入空字符串，表示不分割<br/>|—|`false`|','|
|placeholder|等效于 elProps.placeholder|—|`false`|-|
|filterable|等效于 elProps.filterable|—|`false`|false|
|clearable|等效于 elProps.clearable|—|`false`|false|
|multiple|等效于 elProps.multiple|—|`false`|false|
|elProps|el-select的配置，[el-select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)|`Object`|`false`|-|
|dict|数据字典配置{url:'xxx',data:[],value:'',label:'',children:''}|`Object`|`false`|[object Object]|
|options|选项列表，优先级比dict高|`Array`|`false`|-|
|onReady|选项数据ready|`Function`|`false`|-|

<!-- @vuese:dict-select:props:end -->


## Events

<!-- @vuese:dict-select:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|blur|-|-|

<!-- @vuese:dict-select:events:end -->


