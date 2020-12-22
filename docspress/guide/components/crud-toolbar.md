# crud-toolbar

## Props

<!-- @vuese:crud-toolbar:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|search|是否显示查询传null，则不显示按钮|`Boolean`|`false`|undefined|
|refresh|是否显示刷新|`Boolean`|`false`|true|
|compact|是否显示紧凑模式传null，则不显示按钮|`Boolean`|`false`|undefined|
|export|导出 , true 开启 | false 关闭|`Boolean` / `Object`|`false`|false|
|columns|列配置，传null隐藏按钮|`Array`|`false`|undefined|
|storage|是否保存用户列设置传string则表示传入缓存的主key|`String` / `Boolean`|`false`|true|
|text|文本配置     `     {        refreshBtn: '刷新列表',        searchBtn: '显示/隐藏查询',        compactBtn: '紧凑型页面',        exportBtn: '导出数据',        columnsSetBtn: '列设置',        columnsSet: {          title: '列设置',          fixed: '固定',          order: '排序',          reset: '还原',          confirm: '确定',          unnamed: '未命名'        }      }     `|`Object`|`false`|undefined|

<!-- @vuese:crud-toolbar:props:end -->


## Events

<!-- @vuese:crud-toolbar:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|refresh|-|-|
|update:search|-|-|
|update:compact|-|-|
|columns-filter-changed|-|-|
|export|-|-|

<!-- @vuese:crud-toolbar:events:end -->


## Slots

<!-- @vuese:crud-toolbar:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|ToolbarPreSlot|-|-|
|ToolbarAppendSlot|-|-|

<!-- @vuese:crud-toolbar:slots:end -->


