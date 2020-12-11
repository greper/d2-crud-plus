<template>
  <span>
    <el-tag :type="color" >您点击了:  {{currentValue}}</el-tag>
    <el-button :disabled="disabled || readonly" class="d2-ml-5" @click="doClick('1')">点击1</el-button>
    <el-button :disabled="disabled || readonly" @click="doClick('2')">点击2</el-button>
    插槽：<slot name="test1" :value="1"/>
  </span>
</template>

<script>
// 表单扩展组件示例
// 需要符合v-model的写法
// 简单来说就是，接收value参数，当用户对value进行改变时，通过input通知父组件修改value的值。
export default {
  name: 'd2p-form-input',
  props: {
    // 值
    value: {
      type: String,
      required: false
    },
    // 禁用
    disabled: {
      type: [Boolean],
      required: false,
      default: false
    },
    // 只读
    readonly: {
      type: [Boolean],
      required: false,
      default: false
    },
    // 你可以定义一些参数，通过component.props传进来
    color: {
      required: false
    }
  },
  data () {
    return {
      // 本组件的实际value值
      // 由于value值是props参数，是不允许修改的，需要用别的值存起来
      currentValue: ''
    }
  },
  computed: {
    // 你也可以通过computed来监听value的变化，跟watch作用类似，根据实际情况选用
    // currentValue () {
    //   return this.value
    // }
  },
  watch: {
    value (value) {
      // 父组件收到input事件后会通过v-model改变value参数的值
      // 然后此处会watch到value的改变，发出change事件
      // change事件放在此处发射的好处是，当外部修改value值时，也能够触发form-data-change事件
      this.$emit('change', value)
      if (this.currentValue === value) {
        return
      }
      // 如果值是被外部改变的，则修改本组件的currentValue
      this.setValue(value)
    }
  },
  created () {
    // 给currentValue设置初始值
    this.setValue(this.value)
  },
  mounted () {
  },
  methods: {
    setValue (value) {
      // 在这里对 传入的value值做处理
      this.currentValue = value
    },
    // 用户触发按钮点击
    doClick (value) {
      // 发出input事件通知父组件，然后请看上面watch的注释 ↑↑↑↑
      this.$emit('input', value)
    }
  }
}
</script>
