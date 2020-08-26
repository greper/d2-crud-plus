# 破坏性变更

## 1.13.x  【break change】 
dict.url() 改为返回一个url
dict.url 支持动态构建
```js
{
    dict: {
      // url 传入一个方法时，返回一个url，将会以此url获取字典项
      url (dict, { form , component /* 当前的组件ref */ }) {
        if (form && form.province != null) { 
          return '/linkage/city?province=' + form.province
        }
        return undefined // 返回undefined 将不加载字典
      }
    }
}
```
