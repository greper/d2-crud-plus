# d2-crud-plus
基于d2-admin 的 d2-crud 的扩展,简化d2-crud配置，快速开发crud功能。    

## 特性
以约定优于配置原则简化d2-crud繁琐的配置，只需要配置column即可。   

### 1. 简化addTemplate、editTemplate配置 

addTemplate、editTemplate根据column配置自动生成

### 2. 简化component配置   

column用type字段来自动配置component    
同时也支持自定义组件    
**目前支持**：   
 * input【默认】   
 * select【单选、多选、搜索选择】   
 * date类：datepicker【单个日期、日期段】、 datetimepicker【单个时间、时间段】、timepicker
 * 陆续增加中   
 
### 3. 根据column配置开启关闭顶部查询
* column中可以配置各个字段是否开启search

### 4. 枚举字典功能  

* 支持本地和远程获取
* 轻松实现数据存的是value值，需要对应字典的label来展示，配合select等使用更佳

### 5. d2-crud-x,基于d2-crud的修改版，功能与d2-crud一致【可选】
见【https://github.com/greper/d2-crud-plus/blob/master/src/d2-crud-x/README.md】
* 支持隐藏表格，自定义列表展示方式【配置options.hide=true】
* 支持slot编写各个字段的form表单

## 快速开始
###1.安装
```shell
npm i  @d2-project/d2-crud  d2-crud-plus  -S
```
###2.引入
 ```javascript
import d2Crud from '@d2-project/d2-crud'
import d2CrudPlus from 'd2-crud-plus'
Vue.use(d2Crud)
Vue.use(d2CrudPlus)

// 如果需要slot功能，要将d2-crud替换为d2-crud-x【功能与d2-crud一致】，代码如下
import d2CrudX from 'd2-crud-plus/d2-crud-x'
import d2CrudPlus from 'd2-crud-plus'
Vue.use(d2CrudX)
Vue.use(d2CrudPlus)

 ```
###3. crud配置示例
```javascript
export const crudOptions = {
  columns: [
    {
      title: '日期',
      key: 'createDate',
      sortable: true, 
      type: 'date', //字段类型为时间选择器datepicker,根据类型可自动生成默认配置
      search: {//查询配置，默认启用查询
        key: 'create_date',//【可选】查询字段，默认为column.key
        disabled: true, //【可选】true禁止查询,默认为false
        component:{}//
      },
      form: {//form表单的配置
        disabled: true, //【可选】添加和修改均禁用本字段，默认false
      }
    },
    {
      title: '状态',
      key: 'status',
      sortable: true,
      search: {
        disabled: false //启用查询，默认启用
      },
      type: 'select', //字段类型为选择框
      form: { //配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
        rules: [//【可选】添加和修改时的校验规则，不配置则不校验
          { required: true, message: '请选择状态' }
        ]
      },
      dict: { //数据字典配置
        url: '/api/dicts/StatusEnum' //远程获取数据字典
      }
    },
    {
      title: '地区', 
      key: 'province', 
      sortable: true,
      search: {
        disabled: false //启用查询
      },
      type: 'select', //字段类型为选择框
      form: {
        rules: [{ required: true, message: '请选择地区' }],
        component: { //添加和修改时form表单的组件
          props: { //配置自定义组件的属性
            filterable: true, //可过滤选择项
            multiple: true, //支持多选
            clearable: true //可清除
          }
        }
      },
      dict: {  //本地数据字典
        data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
      }
    }
  ]
}
``` 
###2. 示例数据
```
 [
    {date: '2016-05-02',status: '0', province: 'sz'},
    {date: '2016-05-04',status: '1',province: 'sh,sz'},
    {date: 2232433534511,status: '1', province: 'gz'},
    {date: '2016-05-03',status: '2',province: 'wh,gz'}
  ]
```
###3. 效果    

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/doc/image/list.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/doc/image/add.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/doc/image/edit.png)



<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/d2-admin@2x.png" width="200"></a>
