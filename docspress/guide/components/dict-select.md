# dict-select

## Props

<!-- @vuese:dict-select:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|dict|数据字典{url:'xxx',data:[],value:'',label:'',children:''}|`Object`|`false`|-|
|value|值|`String` / `Array`|`false`|-|
|separator|value的分隔符<br/>多选时，如果value为string，则以该分隔符分割成多个展示<br/>传入空字符串，表示不分割<br/>|—|`false`|','|
|placeholder|等效于 elProps.placeholder|—|`false`|-|
|filterable|等效于 elProps.filterable|—|`false`|false|
|clearable|等效于 elProps.clearable|—|`false`|false|
|multiple|等效于 elProps.multiple|—|`false`|false|
|elProps|el-select的配置，[el-select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)|`Object`|`false`|-|

<!-- @vuese:dict-select:props:end -->


## Events

<!-- @vuese:dict-select:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|
|change|-|-|

<!-- @vuese:dict-select:events:end -->


