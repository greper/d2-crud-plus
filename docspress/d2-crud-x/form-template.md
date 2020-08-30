# 配置: add|edit|view-template
表单字段配置  

## key:column
key:column形式配置多个字段
示例：
```
addTemplate:{
    userId:{ //表单字段
        title:'用户id', //字段label
        component:{ //字段组件
            name: 'el-input'
        }
    },
    userId:{ //字段
        title:'用户id', //字段label
        component:{ //字段组件配置
            name: 'el-input'
        }
    },
}
```

### column.title

* 说明: 表单 label 的名称
* 类型: String
* 可选值: 无
* 默认值: 无

### column.value
* 说明: 表单模板的默认值
* 类型: 无
* 可选值: 无
* 默认值: 无

### column.component
* 说明: 表单渲染的组件配置，[更多关于component配置](./component.md)
* 类型: Object
* 可选值: 
* 默认值: 无

### column.component.name

* 说明: 表单渲染的组件名
* 类型: String
* 可选值: el-input / dict-select / dict-radio / dict-checkbox 等任何支持v-model的表单组件
* 默认值: 无


### column.component.render

* 说明: 使用render函数创建组件，支持jsx语法。(component.name优先级更高)
* 类型: Function (h)
* 可选值: 无
* 默认值: 无


### column.component.span

* 说明: 表单布局所占栅格数，栅格布局请参考 [Layout 布局](http://element-cn.eleme.io/#/zh-CN/component/layout)
* 类型: Number
* 可选值: 无
* 默认值: 无

### column.component.offset

* 说明: 表单栅格布局偏移量，栅格布局请参考 [Layout 布局](http://element-cn.eleme.io/#/zh-CN/component/layout)
* 类型: Number
* 可选值: 无
* 默认值: 无


## group
* 说明: 表单分组配置, `__group__`，与普通的字段key做区分
* 类型: Object
* 可选值: 无
* 默认值: 无

```
addTemplate:{
    __group__:{ //分组信息
        accordion: false,
        type: "collapse",
        groups: { //分组列表
            base: { //分组key，可以随意命名
                title: '商品基础', //分组标题
                icon: 'el-icon-goods', //分组icon
                columns:{ // 分组内包含的字段配置，key:column形式配置多个字段
                    title: { //字段配置
                        title:'商品标题', //字段label
                        component:{ // 字段组件配置
                            name: 'el-input'
                        }
                    },
                    images: { 
                        title:'商品图片',
                        component:{
                            name: 'el-upload'
                        }
                    }
                }
            }
        }
    }
}


```