<template>
  <el-radio-group class="dict_radio" :value="value" v-bind="_elProps"  @input="onInput" @change="onChange">
    <el-radio :disabled="disabled" :readonly="readonly" v-for="option in _options"
              :key="option[dict.value]"
              :label="option[dict.value]"
              v-bind="option"
    >{{option[dict.label]}}</el-radio>
  </el-radio-group>
</template>

<script>
import dict from '../../utils/util.dicts'
import inputBase from '../../mixins/input-base'
// 字典radio选择器
export default {
  name: 'dict-radio',
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
    }
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
  }
}
</script>
<style lang="scss">
  .dict_radio{
    width:100%
  }
  .dict_radio.el-radio-button__inner, .dict_radio.el-radio-group {
      line-height: 40px;
    .el-radio, .el-radio__input{
      line-height: 40px;
    }
  }

</style>
