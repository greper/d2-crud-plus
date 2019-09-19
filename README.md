# d2-crud-plus
基于d2-admin的d2-crud,简化d2-crud配置，快速开发crud功能

## 特性
以约定优于配置原则简化d2-crud繁琐的配置，只需要配置column即可      
### 1. 简化addTemplate、editTemplate配置 

addTemplate、editTemplate根据column配置自动生成

### 2. 简化component配置   

column用type字段来自动配置component  
**目前支持**：   
 * input【默认】   
 * select【单选、多选、搜索选择】   
 * date类：datepicker【单个日期、日期段】、 datetimepicker【单个时间、时间段】、timepicker
 * 陆续增加中   

### 3. 枚举字典功能  

* 支持本地和远程获取
* 轻松实现数据存的是value值，需要对应字典的label来展示，配合select等使用更佳

## 以下为简单示例
```javascript
export const crudOptions = {
  columns: [
    {
      title: '日期',
      key: 'createDate',
      sortable: true,
      type: 'date', //datepicker
      search: {
        key: 'create_date',
        disabled: true //禁止查询
      },
      form: {
        disabled: true, //添加和修改均禁用本字段
        addDisabled: true, //添加时禁用本字段
        editDisabled: true, //修改时禁用本字段
        rules: [
          { required: true, message: '请输入日期' }
        ]
      }
    },
    {
      title: '状态',
      key: 'status',
      sortable: true,
      search: {
        key: 'status',
        disabled: false //启用查询
      },
      type: 'select', //选择框
      form: { //添加 和修改均启用
        rules: [{ required: true, message: '请选择状态' }]
      },
      dict: {
        url: '/api/dicts/StatusEnum' //远程获取数据字典
      }
    },
    {
      title: '地区', 
      key: 'province', 
      sortable: true,
      search: {
        key: 'province',
        disabled: false //启用查询
      },
      type: 'select', //选择框
      form: {
        addDisabld: false, //支持添加
        editDisabled: false,//支持修改
        rules: [{ required: true, message: '请选择地区' }]
      },
      dict: {  //本地数据字典
        data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
      }
    }
  ]
}


![](https://raw.githubusercontent.com/greper/d2-crud-crud/master/doc/image/example-list.png)
![](https://raw.githubusercontent.com/greper/d2-crud-crud/master/doc/image/example-add.png)


