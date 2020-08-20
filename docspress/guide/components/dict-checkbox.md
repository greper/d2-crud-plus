# dict-checkbox

## Props

<!-- @vuese:dict-checkbox:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|dict|数据字典{url:'xxx',data:[],value:'',label:'',children:''}|`Object`|`false`|[object Object]|
|value|值|`Number` / `String` / `Boolean` / `Array`|`false`|-|
|separator|value的分隔符<br/>如果value为string，则以该分隔符分割成多个展示<br/>传入空字符串，表示不分割<br/>|—|`false`|','|
|elProps|el-checkbox的配置，[el-checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)|`Object`|`false`|-|
|options|选项列表，优先级比dict高|`Array`|`false`|-|
|type|按钮类型 [el-checkbox,el-checkbox-button]|`String`|`false`|'el-checkbox'|
|onReady|-|`Function`|`false`|-|

<!-- @vuese:dict-checkbox:props:end -->


