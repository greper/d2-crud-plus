<template>
  <el-tree
    :data="data"
    :props="_elProps.props"
    show-checkbox
    @check-change="handleCheckChange">
  </el-tree>
</template>

<script>
import pcaData from 'china-division/dist/pca-code.json'
import _merge from 'lodash.merge'
/**
   */
export default {
  name: 'd2p-area-selector',
  props: {
    value: {
      type: [String, Array, Object]
    },
    noCode: { type: Boolean, require: false }, // 如果noCode=true 则获取到的值为label
    elProps: {
      type: Object
    }
  },
  data () {
    return {
      data: pcaData
    }
  },
  created () {
    this.initData()
  },
  computed: {
    _elProps () {
      let defaultElProps = {
        showCheckbox: true,
        props: {
          label: 'name',
          value: 'code'
        }
      }
      if (this.noCode === true) {
        defaultElProps.props.value = 'name'
      }
      _merge(defaultElProps, this.elProps)
      return defaultElProps
    }
  },
  methods: {
    initData () {
    },
    handleCheckChange () {
    }
  }
}
</script>
<style>

</style>
