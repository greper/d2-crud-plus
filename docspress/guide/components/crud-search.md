# crud-search

## Props

<!-- @vuese:crud-search:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|options|查询参数，options.form为表单初始值|`Object`|`false`|-|
|columns|查询字段配置|`Array`|`false`|-|
|text|文本配置{search: '查询',reset: '重置'}|`Object`|`false`|-|

<!-- @vuese:crud-search:props:end -->


## Events

<!-- @vuese:crud-search:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|submit|-|-|
|reset|表单重置事件|-|
|search-data-change|-|-|
|search-component-ready|-|-|
|search-component-custom-event|-|-|

<!-- @vuese:crud-search:events:end -->


## Slots

<!-- @vuese:crud-search:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|prefix|-|-|
|item.key+'SearchSlot'|-|-|
|default|-|-|
|suffix|-|-|

<!-- @vuese:crud-search:slots:end -->


