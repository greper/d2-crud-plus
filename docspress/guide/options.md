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

## crudOptions

```javascript
export const crudOptions = {
  columns: [ 
    //字段配置
    // 具体请参考下一节: 字段配置
  ],
  // 下方的配置都是可选的
  viewOptions:{
    disabled: false, // 开启view
    componentType: 'form', // 查看时使用哪种组件展示【form=使用表单组件,row=使用行展示组件】
    defaultRender:(h,scope)=>{return (<span>{scope.value}</span>)} //没有配置组件的，默认渲染render
  },
  pageOptions:{
    compact: false, //是否紧凑页面模式
    export: {
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
  },
  formOptions: { // 编辑对话框及el-form的配置
    labelWidth: '100px',
    labelPosition: 'left',
    saveLoading: false,
    gutter: 20,
    defaultSpan: 12, // 默认表单字段所占宽度
    draggable:true, //是否支持表单对话框拖拽
    updateTableDataAfterEdit: false // 添加和删除提交后，是否直接更新本地table的数据
  },
  searchOptions: { //查询配置参数, 支持el-form的配置参数
    form:{ //默认搜索参数
      name:'小明' // 请求列表默认会带上此处配置参数,重置后会恢复成此处配置的值
    },
    size:'small',
    show: true,//是否显示搜索工具条
    disabled: false, //是否禁用搜索工具条
    debounce:{ //自动查询防抖,debounce:false关闭自动查询
      wait: 500, //延迟500毫秒
      ... //options : https://www.lodashjs.com/docs/lodash.debounce
    },
    buttons:{
      search:{ // 配置false，隐藏按钮
        thin: false, //瘦模式，thin=true 且 text=null 可以设置方形按钮节省位置 
        text: '查看', //按钮文字， null= 取消文字
        type: 'warning', // 按钮类型
        icon:'el-view', //按钮图标
        size: 'small', // 按钮大小
        circle: false,//圆形按钮 ，需要thin=true,且text=null
        show:true, // 是否显示按钮
        disabled:false, // 是否禁用
        order: 1 //排序号，数字小，排前面
      }, 
      reset:{} //同上
    }    
  },
  options: { // d2-crud及el-table的配置参数
    stripe: true,
    border: true,
    highlightCurrentRow: false, //是否高亮选中行
    size: 'mini',
    //要想去掉el-table自身的滚动条，内容高度撑开
    //可以配置 height:null,maxHeight:null,然后用空方法覆盖reComputeCrudHeight(){}
    height: '100%', 
    maxHeight: 'auto',
    events:{ //el-table事件监听
      'expand-change':(event)=>{}
    } 
  },
  pagination: { //翻页配置,更多配置参考el-pagination
    currentPage: 1,
    pageSize: 20,
    total: 1,
    storage:true //本地保存用户每页条数修改，刷新不会丢失该修改，false=关闭
    // storage:'keysuffix'// 传入字符串，将会给保存的key增加一个后缀，用于区分同一个页面下多个crud
  },
  indexRow: { // 序号列,或者直接传true,不显示title，不居中
    title: '序号',
    align: 'center',
    width: 100
  },
  selectionRow: {  //选择列
    align: 'center',
    width: 100
  },
  expandRow: { // 展开列， 或者直接传true,不显示title，不居中
    title: '展开',
    align: 'center',
    width: 100
  },     
  rowHandle: { 
    //行操作栏，与d2-crud一致，默认配置有修改与删除
    width: 100, // 操作列宽度
    title: '操作',// 操作列名
    view:{//查看按钮
        thin: false, //瘦模式，thin=true 且 text=null 可以设置方形按钮节省位置 
        text: '查看', //按钮文字， null= 取消文字
        type: 'warning', // 按钮类型
        icon:'el-view', //按钮图标
        size: 'small', // 按钮大小
        circle: false,//圆形按钮 ，需要thin=true,且text=null
        show:true, // 是否显示按钮
        //show(index,row){return true}// 还可以配置为方法 
        disabled:false, // 是否禁用
        //disabled(index,row){return true} //还可以配置为方法 
        order: 1 //排序号，数字小，排前面，默认顺序：查看=1、编辑=2、删除=3、自定义=4
    }, 
    edit:{}, //编辑按钮,配置同上
    remove:{}, //删除按钮,配置同上
    custom:[//自定义按钮
      {
         //配置同上
         //点击事件,需要在<d2-crud-x @custom-emit="yourHandle"/>
         emit: 'custom-emit' 
      }
    ] 
  },
  formGroup: {  //表单分组
    type: 'collapse', // tab暂未实现
    accordion: false,
    groups: { //分组
      base: { //分组key
        title: '商品基础', //分组标题
        disabled:false, //禁止展开或收起
        // disabled(context){return true} //可以传一个方法
        show: true,//是否显示
        // show(context){return true} //可以传一个方法
        icon: 'el-icon-goods', //分组标题前的图标
        columns: ['title', 'code', 'images'] //该组内包含的字段列表
      }
    }
  },
  format: {
    response (ret) {
      return ret.data //getlist返回结果获取
    },
    page: { // page接口返回的数据结构配置，
      request: { // 请求参数
        current: 'current', //当前页码
        size: 'size' //当前每页条数
        // size(page,size){page[xxx]=size}//你还可以配置为一个方法，自定义操作请求参数
      },
      response: { //返回结果
        current: 'current', // 当前页码 ret.data.current
        size: 'size', // 每页条数，ret.data.size, 
        //size: (data) => { return data.size }, //你也可以配置一个方法，自定义返回
        total: 'total', // 总记录数 ret.data.total
        records: 'records' // 列表数组 ret.data.records
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


## columns
```js
crudOptions={
    columns:[
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
                order: 10, //查询字段排序，数字越小越靠前
                // 是否启用搜索框的slot插槽,需要d2-crud-x才支持
                // 示例 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/#/demo/form/slot
                slot:false 
          },
          form: { 
            //添加和编辑表单配置
            // 具体请参考下一节: form配置
          },
          addForm:{
             //添加对话框的特别配置，当添加和修改的配置有差异时，可以在此单独配置差异部分
          },
          editForm:{
             //修改对话框的特别配置，当添加和修改的配置有差异时，可以在此单独配置差异部分
          },
          view:{// 查看对话框组件的单独配置
            disabled: false,
            component:{...}
          }, 
          valueBuilder (row,key) {
            // 某些组件传入的value值可能是一个复杂对象，而row中的单个属性的值不合适传入
            // 则需要在打开编辑对话框前将row里面多个字段组合成组件需要的value对象
            // 例如：国际手机号(mobileValue为此column的key) 
            // 示例 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/#/demo/form/phone
            // row.mobileValue = { phoneNumber: row.phone, callingCode: row.code, countryCode: row.country }
            // valueBuilder将会在pageRequest成功返回数据后执行
          },
          valueResolve (row,key) { 
            // 组件中传回的值也需要分解成row中多个字段的值，用于提交给后台。
            // 例如：
            // if (row.mobileValue != null) {
            //  row.phone = row.mobileValue.phoneNumber
            //  row.code = row.mobileValue.callingCode
            //  row.country = row.mobileValue.countryCode
            // } 
            // valueResolve 将会在
            //   addRequest（解析添加表单的值）
            //   updateRequest（解析编辑表单的值）
            //   pageRequest（解析查询参数）
            // 之前执行
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
            // url(dict,{form,component}){return '/dict/newUrl'} // 如果url是一个方法，则表示是动态构建url
            cache: true, //是否启用cache，默认开启
            value:'value', // value的属性名
            label:'label', // label的属性名
            children:'children', // children的属性名
            isTree: false, //是否是树形结构
            clone: false, //获取到
            getData: (url,dict,{form,component})=>{return Promise}, //  覆盖全局getRemoteDictData方法,返回 Promise<[dictData]>
            getNodes(values){return nodeArr}, //根据value数组，返回节点数据，用于懒加载时，行展示组件的label显示
            transfer:(data,options)=>{return data},// 可以修改获取到的远程数据，比如将字典的id字段转成字符串形式（缓存开启时只会执行一次）
            onReady:(data,dict,options)=>{ }  //每个组件都会执行一次，配置clone=true后可以随便修改字典数据,只会影响自己组件的数据
          },
          //行内单元格显示组件
          component:{ 
            name:'dict-select', 
            //如果是非vModel组件，则没有value属性
            //此处配置组件的参数名，将row[key]绑定给指定prop
            valueBinding:'propName', 
            props:{...},
            style:{},
            class:{},
            placeholder,
            disabled:false, //可以传入一个方法
            show:true,//是否显示单元格组件
            on:{},//事件绑定
            scopedSlots:{}, //插槽
            children:[] //子元素
          },
          disabled: false, //是否禁止该列（列配置中不显示），不影响form表单
          show: true, //是否在列表中显示该列（列配置中可选），也可以配置一个无参方法
          // 是否启用该cell的slot插槽,需要d2-crud-x才支持
          // 见 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/#/demo/form/slot
          rowSlot: false, 
          formatter (row, column, value, index) {
            // cell 格式化，http://greper.gitee.io/d2-crud-plus/d2-crud-x/columns.html#formatter
          }
        }
      
    ]
}
```

## form

```js
crudOptions:{  
    columns:[
        {
            form:{
                title:'表单字段显示的名称', //默认使用column的title
                rules: [ // 表单校验规则
                    { required: true, message: '请选择地区' }
                ],
                component: { //添加和修改时form表单的组件
                  name: 'dict-select', //表单组件名称，支持任何v-model组件
                  value: null, //组件默认值，你还可以通过覆盖doDialogOpened(context)方法，修改context.form.xx的值
                  props: { //表单组件的参数，具体参数请查看对应的组件文档
                    // 如何查找组件配置，请参考
                    // http://greper.gitee.io/d2-crud-plus/guide/component.html
                    separator:",",//dict-select的组件参数，[不同组件参数不同]
                    elProps:{ //dict-select内部封装了el-select
                      filterable: true, //可过滤选择项
                      multiple: true, //支持多选
                      clearable: true, //可清除
                    }
                  },
                  placeholder:'',
                  disabled: false, //是否在表单中禁用组件
                  // disabled(context){return false}//还可以配置为方法
                  readonly: false, //表单组件是否是只读
                  // readonly(context){return false} //还可以配置为方法
                  show: true, //是否显示该字段，
                  // show(context){return false} //还可以配置为方法         
                  on:{ //除input change事件外，更多组件事件监听
                    select(event){console.log(event)} //监听表单组件的select事件
                  },
                  scopedSlots:{ //插槽渲染
                     default:(h,scope)=>{ //默认的scoped插槽
                        return (<div>{scope.data}</div>)
                     }
                  },
                  children:[ //子元素
                      (h)=>{return (<div slot="prefix">非scoped插槽</div>)}
                  ],
                  order:10,//排序号，默认为10，数字越小 越靠前
                  span: 12 //该字段占据多宽，24为占满一行
                },
                disabled:false, //完全关闭该字段在表单中显示
                addDisabled: false, //是否仅在添加编辑框中关闭该字段
                editDisabled: false, //是否仅在修改编辑框中关闭该字段
                /**
                   * @param value 当前选择的值
                   * @param form 当前表单
                   * @param getColumn 获取字段配置的方法，getColumn(keyName) 返回keyName的字段配置，可以动态修改组件配置
                   * @param mode 当前模式:【add、edit、search】
                   * @param component 当前组件的ref
                   * @param immediate 是否是对话框打开后立即触发的
                   * @param getComponent 获取组件Ref的方法， getComponent(keyName), 返回组件ref，可以动态调用该组件的方法
                **/
                valueChange(key ,value ,form, {getColumn, mode, component, immediate, getComponent }){
                    // form表单数据change事件，表单值有改动将触发此事件
                },
                valueChangeImmediate:false, //是否在打开对话框后触发一次valueChange事件
                // 是否启用form编辑框的slot插槽,需要d2-crud-x才支持
                // 示例 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/#/demo/form/slot
                slot:false,
                itemProps:{
                    // el-form-item的配置
                    //  https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes
                    labelWidth:'0px' //可以隐藏表单项的label
                } 
            }
        }
    ]
}





```
