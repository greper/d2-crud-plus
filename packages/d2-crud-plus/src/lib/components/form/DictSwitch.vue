<template>
  <el-switch
    ref="target"
    :value="value"
    @input="onElInput"
    @change="onChange"
    :disabled="disabled"
    :readonly="readonly"
    :active-color="_active[dict.color]"
    :active-value="_active[dict.value]"
    :active-text="_active[dict.label]"
    :inactive-color="_inActive[dict.color]"
    :inactive-value="_inActive[dict.value]"
    :inactive-text="_inActive[dict.label]"
    v-bind="_elProps"
    v-on="extraEvents"
  >
  </el-switch>
</template>

<script>
import inputBase from '../../mixins/input-base'
import inputDict from '../../mixins/input-dict'
import inputEvents from '../../mixins/input-events'
// 字典switch
export default {
  name: 'dict-switch',
  mixins: [inputBase, inputEvents, inputDict],
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
    }
  },
  computed: {
    _elProps () {
      return {
        ...this.elProps
      }
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
    this.initExtraEvents()
  },
  methods: {
    setValue (value) {
    },
    onDictLoaded () {
      // this.onInput(this.value)
    },
    onElInput (value) { // 字典没有加载完成之前，屏蔽switch发来的input事件
      if (this._active[this.dict.value] == null) {
        return
      }

      this.onInput(value)
    }
  }
}
</script>
