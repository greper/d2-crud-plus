## 文本输入框
不配置type，默认即是文本输入框

## 选择框【select】
```javascript
let column={
   type: 'select',
   form: {
     component: { 
       name:'dict-select',
       props: {
          separator: ',' ,//多选时，value的分隔符
          elProps:{ //
            filterable: true,
            multiple: true,
            clearable: true
           }            
       }    
     }
   },
   component:{
     name:'values-format',
     props:{
       multiple:true, //默认支持多选
       separator: ',' ,//多选时，value的分隔符
     }   
   }
}

```


## 日期

## 级联

 * select：单选、多选、搜索选择   
 * date：单个日期、日期段
 * datetime：日期时间、日期时间段
 * time：时间选择器
 * phoneNumber：国际手机号输入框+校验
 * cascader: 级联输入框  
