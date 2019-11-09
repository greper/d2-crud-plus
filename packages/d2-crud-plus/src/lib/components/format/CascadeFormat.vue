<template>
  <span>
    <template v-for="(item,index) in labels" >
      <span :key="item">
        <span  v-if="index!==0"> / </span>
        <span  >{{item}}</span>
      </span>
    </template>
  </span>
</template>

<script>
import dict from '../../utils/util.dicts'
export default {
  name: 'cascade-format',
  props: {
    value: {
      require: true
    },
    dict: {
      type: Object,
      require: false
    },
    props: {
      type: Object,
      require: false
    }
  },
  data () {
    return {
      options: []
    }
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'options', data)
      console.log('dict update', this.options)
    })
  },
  computed: {
    labels () {
      if (this.value == null) {
        return []
      }
      let arr = null
      if (typeof (this.value) === 'string') {
        arr = this.value.split(',')
      } else if (this.value instanceof Array) {
        arr = this.value
      }

      let labelName = 'label'
      if (this.props != null && this.props.label != null) {
        labelName = this.props.label
      }
      if (this.dict != null && this.dict.label != null) {
        labelName = this.dict.label
      }

      let labelArr = []
      if (this.options != null) {
        let dict = this.options
        for (let value of arr) {
          if (dict != null) {
            let dictItem = this.getDictItem(value, dict)
            if (dictItem != null) {
              dict = dictItem.children
              labelArr.push(dictItem[labelName])
              continue
            }
          }
          labelArr.push(value)
        }
      }
      return labelArr
    }
  },
  methods: {
    getDictItem (value, dict) {
      let valueName = 'value'
      if (this.props != null && this.props.value != null) {
        valueName = this.props.value
      }
      if (this.dict != null && this.dict.value != null) {
        valueName = this.dict.value
      }
      for (let item of dict) {
        if (item[valueName] === value) {
          return item
        }
      }
    }
  }
}
</script>
<style lang="scss">
</style>
