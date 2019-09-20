<template>
  <span>
    <template v-if="type === 'text'">
      <span v-for="(item) in items" :key="item.value">{{item.label}}</span>
    </template>
    <template v-else >
      <el-tag class='tag-item' v-for="(item) in items" :key="item.value"  size="small"  :type="item.color" >
        {{item.label}}
      </el-tag>
    </template>
  </span>
</template>

<script>
import dict from '../../utils/util.dicts'
export default {
  name: 'values-format',
  props: {
    value: {
      require: true
    },
    dict: {
      type: Object,
      require: false
    },
    color: {
      require: false,
      defaultValue: 'primary'
    },
    type: {
      defaultValue: 'tag' // text
    }
  },
  data () {
    return {
      dictData: []
    }
  },
  computed: {
    items () {
      let dictData = this.dictData
      if (this.value == null || this.value === '') {
        return []
      }
      let valueArr = []
      let options = []
      if (typeof (this.value) === 'string') {
        valueArr = this.value.split(',')
      } else if (this.value instanceof Array) {
        // 本来就是数组的
        valueArr = this.value
      } else {
        valueArr = [this.value]
      }

      if (dictData == null || dictData.length === 0) {
        for (let str of valueArr) {
          options.push({
            value: str,
            label: str,
            color: this.color
          })
        }
        return options
      }
      // 根据字典展示
      for (let str of valueArr) {
        let found = null
        for (let dict of this.dictData) {
          if (dict.value === str) {
            found = dict
            break
          }
        }
        if (found) {
          options.push(found)
        } else {
          options.push({
            value: str,
            label: str,
            color: this.color
          })
        }
      }
      return options
    }
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'dictData', data)
    })
  },
  methods: {
    handleClick () {
      // this.$emit('input', !this.value)
    }
  }
}
</script>
<style>
  .tag-item{
    margin-right: 10px;
  }
</style>
