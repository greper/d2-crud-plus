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
// 级联数据格式化组件
export default {
  name: 'cascade-format',
  props: {
    // 值<br/>
    // 单选时 '1,2,3' 或 [1,2,3]<br/>
    // 多选[[1,2,3],[4,5,6]]<br/>
    value: {
      type: [String, Array],
      require: true
    },
    // value的分隔符<br/>
    // 多选时，如果value为string，则以该分隔符分割成多个展示<br/>
    // 传入空字符串，表示不分割<br/>
    separator: { default: ',', require: false },
    // 是否多选
    multiple: { type: Boolean, default: false },
    // 数据字典<br/>
    // {url:'xxx',data:[],value:'',label:'',children:''}
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
      if (typeof (values) === 'string' && !this.multiple && this.separator != null && this.separator !== '') {
        arr = values.split(this.separator)
      } else if (values instanceof Array) {
        arr = values
      } else {
        arr = [values]
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
