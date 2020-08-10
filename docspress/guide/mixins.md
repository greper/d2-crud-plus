# d2CrudPlus.crud
## 如何工作
d2CrudPlus是通过 crud页面的混入功能开始工作的   
混入之后，该crud页面将继承d2CrudPlus.curd的方法
```html
<template>
...
</template>
<script>
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
}
</script>
```

## 暴露的方法

以下方法可以根据你的实际情况，进行调用或者在页面的methods中覆盖重写

<<< @/packages/d2-crud-plus/src/lib/mixins/expose.js


