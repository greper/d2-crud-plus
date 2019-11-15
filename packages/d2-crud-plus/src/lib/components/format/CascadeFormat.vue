<template>
  <span>
    <template v-if="multiple"  >
      <div v-for="(Labels,Index) in multipleLabels" :key="Index">
        <span  v-for="(label,index) in Labels" :key="label">
          <span  v-if="index!==0"> / </span>
          <span>{{label}}</span>
        </span>
      </div>
    </template>
    <template v-else >
      <span v-for="(label,index) in labels"  :key="label">
        <span  v-if="index!==0"> / </span>
        <span  >{{label}}</span>
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
    multiple: { type: Boolean, default: false },
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
    })
  },
  computed: {
    labels () {
      if (this.value == null) {
        return []
      }
      return this.buildValueItem(this.value)
    },
    multipleLabels () {
      if (this.value == null) {
        return []
      }
      let arr = []
      for (let item of this.value) {
        arr.push(this.buildValueItem(item))
      }
      return arr
    }
  },
  methods: {
    getDictItem (value, dict) {
      let valueName = 'value'
      if (this.dict != null && this.dict.value != null) {
        valueName = this.dict.value
      }
      for (let item of dict) {
        if (item[valueName] === value) {
          return item
        }
      }
    },
    buildValueItem (values) {
      let arr = null
      if (typeof (values) === 'string') {
        arr = values.split(',')
      } else if (values instanceof Array) {
        arr = values
      }

      let labelName = 'label'
      if (this.dict != null && this.dict.label != null) {
        labelName = this.dict.label
      }

      let childrenName = 'children'
      if (this.dict != null && this.dict.children != null) {
        childrenName = this.dict.children
      }
      let labelArr = []
      if (this.options != null) {
        let dict = this.options
        for (let value of arr) {
          if (dict != null) {
            let dictItem = this.getDictItem(value, dict)
            if (dictItem != null) {
              dict = dictItem[childrenName]
              labelArr.push(dictItem[labelName])
              continue
            }
          }
          labelArr.push(value)
        }
      }
      return labelArr
    }
  }
}
</script>
<style lang="scss">
</style>
