<template>
  <el-radio-group class="d2p-dict-radio" :value="value" v-bind="_elProps"  @input="onInput" @change="onChange">
    <component :is="type" :disabled="disabled" :readonly="readonly" v-for="option in _options"
              :key="option[dict.value]"
              :label="option[dict.value]"
              v-bind="option"
    >{{option[dict.label]}}</component>
  </el-radio-group>
</template>

<script>
import inputBase from '../../mixins/input-base'
import inputDict from '../../mixins/input-dict'
// 字典radio选择器
export default {
  name: 'dict-radio',
  mixins: [inputBase, inputDict],
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
    // 按钮类型 [el-radio,el-radio-button]
    type: {
      type: String,
      default: 'el-radio'
    },

    // 字典加载完成
    onReady: {
      type: Function,
      require: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    _elProps () {
      return {
        ...this.elProps
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
  .d2p-dict-radio{
    width:100%
  }
  //.d2p-dict-radio.el-radio-button__inner, .d2p-dict-radio.el-radio-group {
  //    line-height: 40px;
  //  .el-radio, .el-radio__input{
  //    line-height: 40px;
  //  }
  //}

</style>
