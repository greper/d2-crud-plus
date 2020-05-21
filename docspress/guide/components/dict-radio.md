# dict-radio

## Props

<!-- @vuese:dict-radio:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|dict|数据字典{url:'xxx',data:[],value:'',label:'',children:''}|`Object`|`false`|default() {
  return {
    label: 'label',
    value: 'value'
  };
}|
|value|值|—|`false`|-|
|elProps|el-radio的配置，[el-radio](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)|`Object`|`false`|-|
|options|选项列表，优先级比dict高|`Array`|`false`|-|

<!-- @vuese:dict-radio:props:end -->


## Events

<!-- @vuese:dict-radio:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|
|change|-|-|

<!-- @vuese:dict-radio:events:end -->


