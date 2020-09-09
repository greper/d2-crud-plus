import dict from '../utils/util.dicts'

export default {
  inject: {
    d2CrudContext: {
      default () {
        return undefined
      }
    }
  },
  props: {
    // 数据字典配置
    // {url:'xxx',data:[],value:'',label:'',children:''}
    dict: {
      type: Object,
      require: false,
      default: () => {
        return { data: undefined }
      }
    }
  },
  data () {
    return {
      dataMap: {},
      data: [],
      returnType: 'dataMap',
      loading: false
    }
  },
  created () {
    if (this.dict) {
      if (this.dict.immediate !== false) {
        this.loadDict()
      }
    }
    // 根据changeReload参数确定是否需要watch value ，优化性能
    this.registerWatch()
  },
  methods: {
    registerWatch () {
      let needWatch = this.changeReload
      if (needWatch == null) {
        needWatch = this.dict && this.dict.url instanceof Function
      }
      if (needWatch) {
        // 绑定是否观察value
        this._unwatch = this.$watch('value', function (value) {
          this.loadDict()
        })
        this.$once('hook:beforeDestroy', function () {
          // 销毁后取消观察
          this._unwatch()
        })
      }
    },
    loadDict () {
      const options = { component: this, returnType: this.returnType }
      if (this.d2CrudContext) {
        options.form = this.d2CrudContext.getForm()
      }
      this.loading = true
      dict.get(this.dict, options).then((data) => {
        debugger
        this.loading = false
        this.resolveDictData(data)
      })
    },
    resolveDictData (data) {
      this.$set(this, this.returnType, data)
    }
  }
}
