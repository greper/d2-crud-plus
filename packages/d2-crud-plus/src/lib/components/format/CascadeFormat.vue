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

      let labelArr = []
      if (this.options != null) {
        let dict = this.options
        for (let value of arr) {
          if (dict != null) {
            let dictItem = this.getDictItem(value, dict)
            if (dictItem != null) {
              dict = dictItem.children
              labelArr.push(dictItem.label)
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
      for (let item of dict) {
        if (item.value === value) {
          return item
        }
      }
    }
  }
}
</script>
<style lang="scss">
</style>
