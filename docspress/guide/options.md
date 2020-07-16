# crud配置项

## 最简配置
```javascript
export const crudOptions = {
  columns: [ //字段配置
    {
      title: '地区',  
      key: 'province', 
      type: 'select',
      dict: {url:'/dict/getProvinceList'}
    }
  ]
}
```
## 最全配置
```javascript
export const crudOptions = {
  columns: [ //字段配置
    {
      title: '地区',  
      key: 'province', 
      // -----下方的配置都是可选的------
      type: 'select', //字段类型，根据类型可生成该字段的默认配置，下方那么多配置基本可以不用写（没有定制化需求的话）
      sortable: true, //是否支持排序
      search: {
        disabled: false, //是否禁用该字段的查询，默认false
        component:{ //查询框组件配置，默认根据form配置生成 
           name:'dict-select' //支持任何v-model组件
        },
        // 是否启用搜索框的slot插槽,需要d2-crud-x才支持
        // 示例 http://qiniu.veryreader.com/D2CrudPlusExample/#/demo/form/slot
        slot:false 
      },
      form: { //添加和编辑表单配置
        rules: [ // 表单校验规则
          { required: true, message: '请选择地区' }
        ],
        component: { //添加和修改时form表单的组件
          title:'表单字段显示的名称' //默认使用column的title
          name: 'dict-select', //表单组件名称，支持任何v-model组件
          props: { //表单组件的参数，具体参数请查看对应的组件文档
            separator:",",//dict-select的组件参数，[不同组件参数不同]
            elProps:{ //dict-select内部封装了el-select
              filterable: true, //可过滤选择项
              multiple: true, //支持多选
              clearable: true, //可清除
            } 
          },
          disabled: false, //是否在表单中禁用组件，也可以配置为方法：disabled(){return false}
          readonly: false, //表单组件是否是只读，也可以配置为方法：readonly(){return false}
          events:{ //除input change事件外，更多组件事件监听
            select(event){console.log(event)} //监听表单组件的select事件
          },
          scopedSlots:{ //插槽渲染
             default:(h,scope)=>{ //默认插槽
                return (<div>{scope.data}</div>)
             }
          }
          span: 12 //该字段占据多宽，24为占满一行
        },
        disabled:false, //完全关闭该字段在表单中显示
        addDisabled: false, //是否仅在添加编辑框中关闭该字段
        editDisabled: false, //是否仅在修改编辑框中关闭该字段
        valueChange(key ,value ,form){
            // form表单数据change事件，表单某项有改动将触发此事件
        },
        // 是否启用form编辑框的slot插槽,需要d2-crud-x才支持
        // 示例 http://qiniu.veryreader.com/D2CrudPlusExample/#/demo/form/slot
        slot:false,
        show: true, //是否显示该字段，也可以配置为方法：show(){return false}
      },
      addForm:{
         //添加对话框的特别配置，当添加和修改的配置有差异时，可以在此单独配置差异部分
      },
      editForm:{
         //修改对话框的特别配置，当添加和修改的配置有差异时，可以在此单独配置差异部分
      },
      valueBuilder (row,key) {
        // 某些组件传入的value值可能是一个复杂对象，而row中的单个属性的值不合适传入
        // 则需要在打开编辑对话框前将row里面多个字段组合成组件需要的value对象
        // 例如：国际手机号(mobileValue为此column的key) 
        // 示例 http://qiniu.veryreader.com/D2CrudPlusExample/#/demo/form/phone
        // row.mobileValue = { phoneNumber: row.phone, callingCode: row.code, countryCode: row.country }
      },
      valueResolve (row,key) { 
        // 组件中传回的值也需要分解成row中多个字段的值，用于提交给后台。
        // if (row.mobileValue != null) {
        //  row.phone = row.mobileValue.phoneNumber
        //  row.code = row.mobileValue.callingCode
        //  row.country = row.mobileValue.countryCode
        // } 
      },
      dict: { // 数据字典配置， 供select等组件通过value匹配label
        data: [ // 本地数据字典
          { value: 'sz', label: '深圳' },
           { value: 'gz', label: '广州' }, 
           { value: 'wh', label: '武汉' }, 
           { value: 'sh', label: '上海' }
        ],
        // 若data为空，则通过http请求获取远程数据字典
        // 也可以传入一个异步请求来自定义请求方式
        url:'/dict/get', 
        // cache: true, //是否启用cache，默认开启
        // value:'value', value的属性名
        // label:'label', label的属性名
        // children:'children', children的属性名
        // isTree: false //是否是树形结构
        // getData: (url,dict)=>{} 覆盖全局getRemoteDictData方法
      },
      //行内单元格显示组件
      component:{ name:'dict-select', props:{...}},
      //是否隐藏该列在列表中显示，不影响form表单中该字段的显示
      disabled: false, 
      // 是否启用该cell的slot插槽,需要d2-crud-x才支持
      // 见 http://qiniu.veryreader.com/D2CrudPlusExample/#/demo/form/slot
      rowSlot: false, 
      
      formatter (row, column, value, index) {
        // cell 格式化，与d2-crud一致
      }
    }
  ],
  // 下方的配置都是可选的
  pageOptions:{
    compact: false //是否紧凑页面模式
  },
  formOptions: { // 编辑对话框及el-form的配置
    labelWidth: '100px',
    labelPosition: 'left',
    saveLoading: false,
    gutter: 20,
    defaultSpan: 12, // 默认表单字段所占宽度
    updateTableDataAfterEdit: false // 添加和删除提交后，是否直接更新本地table的数据
  },
  searchOptions: { //查询配置参数
    form:{},//默认搜索参数
    show: true,//是否显示搜索工具条
    disabled: false, //是否禁用搜索工具条
    debounce:{ //自动查询防抖,debounce:false关闭自动查询
      wait: 500 //延迟500毫秒
      ... //options : https://www.lodashjs.com/docs/lodash.debounce
    }   
  },
  options: { // d2-crud及el-table的配置参数
    stripe: true,
    border: true,
    highlightCurrentRow: false, //是否高亮选中行
    size: 'mini'
  },
  pagination: { //翻页配置
    currentPage: 1,
    pageSize: 20,
    total: 1
  },
  rowHandle: { 
    //行操作栏，与d2-crud一致，默认配置有修改与删除
    edit:{//编辑按钮
    }, 
    remove:{}, //删除按钮
    custom:[//自定义按钮
    ] 
  },
  formGroup: {  //表单分组
    type: 'collapse', // tab暂未实现
    accordion: false,
    groups: { //分组
      base: { //分组key
        title: '商品基础', //分组标题
        icon: 'el-icon-goods', //分组标题前的图标
        columns: ['title', 'code', 'images'] //该组内包含的字段列表
      }
    }
  },
  addTemplate: {}, //根据form配置自动生成,请不要配置
  editTemplate: {}, //根据form配置自动生成,请不要配置
  addRules: {}, //根据form配置自动生成,请不要配置
  editRules: {},//根据form配置自动生成,请不要配置
  list: [], //数据列表，跟pageRequest从后端获取数据
  loading: false //当前是否正在loading,请不要配置
}

```
