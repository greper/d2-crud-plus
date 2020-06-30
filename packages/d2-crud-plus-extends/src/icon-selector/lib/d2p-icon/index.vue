<template>
  <i class="fa" :class="`fa-${value}`" aria-hidden="true"></i>
</template>

<script>
// icon组件,与d2-icon差不多，参数name改成了value
export default {
  name: 'd2p-icon',
  props: {
    // icon名称
    value: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
