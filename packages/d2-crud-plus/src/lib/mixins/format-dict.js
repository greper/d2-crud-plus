import dict from '../utils/util.dicts'

export default {
  inject: ['d2CrudContext'],
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
      returnType: 'dataMap'
    }
  },
  created () {
    if (this.dict) {
      if (this.dict.immediate !== false) {
        this.loadDict()
      }
    }
  },
  methods: {
    loadDict () {
      const options = { component: this, returnType: this.returnType }
      if (this.d2CrudContext) {
        options.form = this.d2CrudContext.getForm()
      }
      dict.get(this.dict, options).then((dataMap) => {
        this.$set(this, this.returnType, dataMap)
      })
    }
  }
}
