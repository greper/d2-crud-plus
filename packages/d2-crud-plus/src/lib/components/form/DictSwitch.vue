<template>
  <el-switch
    :value="value"
    v-bind="_elProps"
    @input="onInput"
    @change="onChange"
    :disabled="disabled"
    :readonly="readonly"
    :active-color="_active[dict.color]"
    :active-value="_active[dict.value]"
    :active-text="_active[dict.label]"
    :inactive-color="_inActive[dict.color]"
    :inactive-value="_inActive[dict.value]"
    :inactive-text="_inActive[dict.label]"
  >
  </el-switch>
</template>

<script>
import dict from '../../utils/util.dicts'
import inputBase from '../../mixins/input-base'
// 字典radio选择器
export default {
  name: 'dict-switch',
  mixins: [inputBase],
  props: {
    // 数据字典
    // {url:'xxx',data:[],value:'',label:'',children:''}
    dict: {
      type: Object,
      require: false,
      default: () => {
        return { data: undefined }
      }
    },
    // 值
    value: { require: false },
    // el-radio的配置，[el-radio](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)
    elProps: {
      type: Object,
      require: false
    },
    // 选项列表，优先级比dict高
    options: {
      type: Array,
      require: false
    },
    onReady: {
      type: Function,
      require: false
    }
  },
  data () {
    return {
      dictOptions: undefined
    }
  },
  computed: {
    _elProps () {
      return {
        ...this.elProps
      }
    },
    _options () {
      if (this.options != null) {
        return this.options
      }
      if (this.dictOptions != null) {
        return this.dictOptions
      }
      return []
    },
    _active () {
      if (this._options.length > 0) {
        return this._options[0]
      }
      return {}
    },
    _inActive () {
      if (this._options.length > 1) {
        return this._options[1]
      }
      return {}
    }
  },
  created () {
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'dictOptions', data)
      if (this.onReady != null) {
        this.onReady(this)
      }
    })
  },
  methods: {
    setValue () {
      // 置空
    }

  }
}
</script>
