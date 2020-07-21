import dict from '../utils/util.dicts'

export default {
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
      dictDataMap: {}
    }
  },
  mounted () {

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
      dict.get(this.dict, { returnType: 'dataMap', component: this, form: this.$attrs._form }).then((dataMap) => {
        this.$set(this, 'dictDataMap', dataMap)
      })
    }
  }
}
