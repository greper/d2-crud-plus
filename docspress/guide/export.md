# 数据导出
数据导出默认关闭

## 开启导出功能
#### 1. 安装插件(服务端导出不需要)
```
npm i @d2-projects/vue-table-export --save
```
vue.use
```js
import Vue from 'vue'
import pluginExport from '@d2-projects/vue-table-export'
Vue.use(pluginExport)
```
#### 2. 开启数据导出配置
```js
const crudOptions={
    pageOptions:{
        export:{
            local:true,//本地导出，false为服务端导出
            title:'数据导出',//导出的文件名
            type:'excel', //导出文件类型，可选： [ csv | excel ]
            formatter(row, context){
                // 数据格式化，row.xxx = parseInt(row.xxx)
            },
            // 以下是 vue-table-export 插件的参数
            // excel
            header:'',// 第一行
            merges: undefined, // 合并单元格
            // csv
            noHeader: undefined, // 不导出表头
	        separator:',', // 数据分隔符	非	String		,
            quoted:false	//每项数据是否加引号
        }
    }
}
```
更多参数请参考：[vue-table-export文档](https://d2.pub/zh/doc/d2-admin/plugin/data-export.html#表格导出)

#### 3. toolbar 增加导出按钮
```html
<!-- 追加导出属性与事件 -->
<div slot="header">
  <crud-toolbar ... :export="crud.pageOptions.export" @export="handleExport"/>
</div>

<!-- 推荐直接简写成如下方式 -->
<div slot="header">
    <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
</div>

```


## 服务端导出

1. 配置
```js
const crudOptions={
    pageOptions:{
        export:{
            local:false,//配置为服务端导出
    }
}
```

2. 自定义服务端导出方法
 服务端导出请自由发挥    
 * 数据量比较小的话，可以组装好参数，通过window.open()，直接打开服务端导出url
 * 数据量比较大的话，可以通过request提交导出请求，然后提示用户您的导出任务正在处理
```js
 /**
 * 服务端导出数据
 * @param context={
      search: this.crud.searchOptions.form,  //当前查询参数
      columns: this.crud.columns, //当前字段
      data: this.crud.list // 当前数据
 * }
 */
doServerExport (context) {
    //请自由发挥
},
```

