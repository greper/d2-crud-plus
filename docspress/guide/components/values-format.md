# values-format

## Props

<!-- @vuese:values-format:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|值|—|`false`|-|
|multiple|是否多选|—|`false`|true|
|separator|value的分隔符<br/>多选时，如果value为string，则以该分隔符分割成多个展示<br/>传入空字符串，表示不分割<br/>|—|`false`|','|
|dict|数据字典<br/>{url:'xxx',data:[],value:'',label:'',children:''}|`Object`|`false`|default() {
  return {};
}|
|color|颜色，【primary, success, warning, danger ,info】|—|`false`|'primary'|
|type|展示类型【text, tag】|—|`false`|'tag'|

<!-- @vuese:values-format:props:end -->


