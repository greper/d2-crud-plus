# d2-crud-plus
基于d2-admin的d2-crud,简化d2-crud配置，快速开发crud功能

## 特性
以约定优于配置原则简化d2-crud繁琐的配置，只需要配置column即可      
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

### 3. 枚举字典功能  

* 支持本地和远程获取
* 轻松实现数据存的是value值，需要对应字典的label来展示，配合select等使用更佳

### 4.表单组件slot支持
* 
* 此功能需要d2-crud-x支持，基于d2-crud的修改版
* 详情：

## 以下为简单示例
###1. crud配置
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
        rules: [{ required: true, message: '请选择地区' }],
        component: {
          props: {
            filterable: true,
            multiple: true,
            clearable: true
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


