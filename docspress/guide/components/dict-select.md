# dict-select

字典选择器

## Props

<!-- @vuese:dict-select:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|dict|数据字典 {url:'xxx',data:[],value:'',label:'',children:''}|`Object`|`false`|-|
|value|值|`Number` /  `String` /  `Boolean` /  `Array`|`false`|-|
|separator|value的分隔符<br/> 多选时，如果value为string，则以该分隔符分割成多个展示<br/> 传入空字符串，表示不分割<br/>|—|`false`|,|
|placeholder|等效于 elProps.placeholder|—|`false`|-|
|filterable|等效于 elProps.filterable|—|`false`|-|
|clearable|等效于 elProps.clearable|—|`false`|-|
|multiple|等效于 elProps.multiple|—|`false`|-|
|elProps|el-select的配置，[el-select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)|`Object`|`false`|-|
|options|选项列表，优先级比dict高|`Array`|`false`|-|

<!-- @vuese:dict-select:props:end -->


## Events

<!-- @vuese:dict-select:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|
|change|-|-|

<!-- @vuese:dict-select:events:end -->


