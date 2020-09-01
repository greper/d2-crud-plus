# 暴露的方法
crud页面混入`d2CrudPlus.crud`后将会暴露以下方法   
以下方法可以根据你的实际情况通过`this.xxx() 来调用他们`或者在页面的methods中`覆盖重写`

<<< @/packages/d2-crud-plus/src/lib/mixins/expose.js


::: warning
注意不要覆盖[d2CrudPlus.crud](https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/mixins/crud.js)中未暴露的方法
:::



