<template>
  <span  class="d2p-values-format">
    <template v-if="type === 'text'">
      <span v-for="(item) in _items" :key="item[dict.value]">{{item[dict.label]}}</span>
    </template>
    <template v-else >
      <el-tag class='tag-item  d2-mr-5 d2-mb-2 d2-mt-2' v-for="(item) in _items"
              :key="item[dict.value]"
              size="small"
              :type="item[dict.color]"
              @click="onClick(item)"
              :effect="item.effect"
      >
        {{item[dict.label]}}
      </el-tag>
    </template>
  </span>
</template>

<script>
import formatDict from '../../mixins/format-dict'
const COLOR_LIST = ['primary', 'success', 'warning', 'danger']
const EFFECT_LIST = ['plain', 'light']

// value格式化展示组件
export default {
  name: 'values-format',
  mixins: [formatDict],
  props: {
    // 值
    value: {
      require: false
    },
    // 是否多选
    multiple: { default: true, require: false },
    // value的分隔符<br/>
    // 多选时，如果value为string，则以该分隔符分割成多个展示<br/>
    // 传入空字符串，表示不分割<br/>
    separator: { default: ',', require: false },
    // 数据字典
    dict: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    },
    // 颜色，【auto, primary, success, warning, danger ,info】
    // 配置auto，则自动根据value值hashcode分配颜色值
    color: {
      require: false,
      default: 'primary'
    },
    // 自动颜色列表，【 primary, success, warning, danger 】
    autoColors: {
      type: Array
    },
    // 自动主题列表，【 light, plain 】
    autoEffects: {
      type: Array
    },
    // 展示类型【text, tag】
    type: {
      default: 'tag' // 可选【text,tag】
    },
    // valuechange 是否reload
    changeReload: {
      default: undefined
    }

  },
  data () {
    return {}
  },
  computed: {
    _items () {
      if (this.value == null || this.value === '') {
        return []
      }
      if (this.loading) {
        return []
      }
      const dictDataMap = this[this.returnType]
      const valueArr = this.getValueArr()
      const options = []
      const dict = this.dict
      // 没有字典，直接显示值
      if (dictDataMap == null || Object.keys(dictDataMap).length === 0) {
        for (const str of valueArr) {
          const item = {}
          item[dict.value] = str
          item[dict.label] = str
          this.setColor(item, dict)
          options.push(item)
        }
        return options
      }
      // 根据字典展示
      for (const str of valueArr) {
        let item = dictDataMap[str]
        if (item != null) {
          this.setColor(item, dict)
          options.push(item)
        } else {
          item = {}
          item[dict.value] = str
          item[dict.label] = str
          this.setColor(item, dict)
          options.push(item)
        }
      }
      return options
    }
  },
  created () {

  },
  methods: {
    getValueArr () {
      let valueArr = []
      if (typeof (this.value) === 'string' && this.multiple && this.separator != null && this.separator !== '') {
        valueArr = this.value.split(this.separator)
      } else if (this.value instanceof Array) {
        // 本来就是数组的
        valueArr = this.value
      } else {
        valueArr = [this.value]
      }
      return valueArr
    },
    onClick (item) {
      this.$emit('click', { item: item })
    },
    setColor (item, dict) {
      if (item[dict.color]) {
        return
      }
      if (this.color === 'auto') {
        const hashcode = this.hashcode(item[dict.value])
        const colors = this.autoColors ? this.autoColors : COLOR_LIST
        item[dict.color] = colors[hashcode % colors.length]
        const effects = this.autoEffects ? this.autoEffects : EFFECT_LIST
        item.effect = effects[Math.floor(hashcode / colors.length) % effects.length]
      } else {
        item[dict.color] = this.color
      }
    },
    hashcode (str) {
      if (str == null) {
        return 0
      }
      if (typeof str !== 'string') {
        str = JSON.stringify(str)
      }
      let hash = 0; let i; let chr; let len
      if (str.length === 0) return hash
      for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0 // Convert to 32bit integer
      }
      return hash
    }
  }
}
</script>
<style >
  .d2p-values-format .tag-item{
    margin-right: 10px;
  }
</style>
