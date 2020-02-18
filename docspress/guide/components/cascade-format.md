# cascade-format

级联数据格式化组件

## Props

<!-- @vuese:cascade-format:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|值<br/> 单选时 '1,2,3' 或 [1,2,3]<br/> 多选[[1,2,3],[4,5,6]]<br/>|`String` /  `Array`|`false`|-|
|separator|value的分隔符<br/> 多选时，如果value为string，则以该分隔符分割成多个展示<br/> 传入空字符串，表示不分割<br/>|—|`false`|,|
|multiple|是否多选|`Boolean`|`false`|-|
|dict|数据字典<br/> {url:'xxx',data:[],value:'',label:'',children:''}|`Object`|`false`|-|

<!-- @vuese:cascade-format:props:end -->


