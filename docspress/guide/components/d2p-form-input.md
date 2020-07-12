# d2p-form-input

## Props

<!-- @vuese:d2p-form-input:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|值|`String`|`false`|-|
|disabled|禁用|`Boolean`|`false`|false|
|readonly|只读|`Boolean`|`false`|false|
|color|你可以定义一些参数，通过component.props传进来|—|`false`|-|

<!-- @vuese:d2p-form-input:props:end -->


## Events

<!-- @vuese:d2p-form-input:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|父组件收到input事件后会通过v-model改变value参数的值然后此处会watch到value的改变，发出change事件change事件放在此处发射的好处是，当外部修改value值时，也能够触发form-data-change事件|-|
|input|发出input事件通知父组件，然后请看上面watch的注释 ↑↑↑↑|-|

<!-- @vuese:d2p-form-input:events:end -->


## Slots

<!-- @vuese:d2p-form-input:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|test1|-|-|

<!-- @vuese:d2p-form-input:slots:end -->


