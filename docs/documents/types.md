## 文本输入框
默认即是text 文本输入框

## 选择

```javascript
let crudOptions={
    columns:[
        {
            type: 'select',
            form: {
            component: {
                props: {
                    filterable: true,
                    multiple: true,
                    clearable: true
                }
             }
            },
            dict: {} 
        }
    ]
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
