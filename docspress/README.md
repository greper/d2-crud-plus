---
home: true
tagline: 简化crud配置，快速开发crud功能
heroImage: /icon-only.png
actionText: 快速上手 →
actionLink: /guide/
features:
- title: 简洁至上
  details: 以 d2-crud 为基础，以最少的配置帮助你简化crud开发。
- title: 字段类型
  details: 丰富的字段类型，大幅减少代码量。
- title: 数据字典
  details: 轻松实现动态select。
- title: 自定义扩展
  details: 再困难的需求，也能实现。
- title: 权限管理
  details: RBAC权限管理示例。
- title: 代码生成
  details: 根据数据表生成前后端代码，一气呵成。  
footer: MIT Licensed | Copyright © 2018-present Greper
---

简单的字段配置

```js
  columns: [
    {
      title: '日期', //字段名称
      key: 'date', //字段key
      type: 'date', //字段类型，添加、修改、查询将自动生成相应表单组件
    },
    {
      title: '状态',
      key: 'status',
      type: 'select', //选择框，默认单选
      dict: { url: '/api/dicts/OpenStatusEnum' }//远程数据字典
    },
    {
      title: '地区',
      key: 'province',
      type: 'select', //选择框
      form: { //表单组件配置，此处配置选择框为多选
        component: { props: { filterable: true, multiple: true, clearable: true } }
      },
      dict: {
        data: [ //本地数据字典
          { value: 'sz', label: '深圳' },
          { value: 'gz', label: '广州' },
          { value: 'wh', label: '武汉' },
          { value: 'sh', label: '上海' }
        ]
      }
    }
  ]
```

 一个完全体crud就出来了 :point_down:
 

<img :src="$withBase('/gif.webp')" alt="完全体crud">
