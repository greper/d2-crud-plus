<template>
  <el-button v-bind="_elProps" @click="onClick">{{text}}</el-button>
</template>

<script>
import inputBase from '../../mixins/input-base'
import inputDict from '../../mixins/input-dict'
export default {
  name: 'd2p-button-input',
  mixins: [inputBase, inputDict],
  props: {
    text: {
      default: '点击',
      require: false
    },
    // el-input的配置，[el-input](https://element.eleme.cn/#/zh-CN/component/input)
    elProps: {
      type: Object,
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
    onClick () {
      this.onChange(this.value)
    }
  }
}
</script>
