# 破坏性变更
## 2.11.0 统一版本
1. 【break change】 可能会将form中的一些其他属性也绑定到search上，注意修改旧版本

 
## example 1.17.5 【break change】 
优化权限模块，完全去除“平台管理”相关功能。    
鉴于“平台管理”功能给很多小伙伴带来一些困扰，优化之后权限模块更加简单清晰明了。

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
