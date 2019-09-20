<template>
  <el-form
      :inline="true"
      :model="form"
      ref="searchForm"
      size="small" >

    <el-form-item v-for="(item) in options.columns" :key="item.key"  :label="item.label" :prop="item.key"  >
      <template v-if="item.slot === true">
        <slot :name="item.key+'SearchSlot'" v-bind:form="form" ></slot>
      </template>
      <el-input
          v-else-if="item.component == null || item.component.name == null ||  item.component.name === 'el-input'"
          v-model="form[item.key]"
          :placeholder="item.label"
          :style="'width:'+(item.width!=null?item.width:150)+'px'"/>
      <render-custom-component
          v-else-if="item.component && item.component.name"
          :component-name="item.component.name"
          v-model="form[item.key]"
          :props="item.component.props ? item.component.props : null"
          :style="'width:'+(item.width!=null?item.width:150)+'px'">
      </render-custom-component>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          @click="handleFormSubmit">
        <d2-icon name="search"/>
        查询
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button
          @click="handleFormReset">
        <d2-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: 'crud-search',
  components: { },
  props: {
    options: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        'house_id': null
      }
      // rules: {
      //   type: [ { required: true, message: '请选择一个状态', trigger: 'change' } ],
      //   user: [ { required: true, message: '请输入用户', trigger: 'change' } ]
      // }
    }
  },
  created () {
    // do somthing
    // for (let item of this.options.columns) {
    //   this.form[item.key]
    // }

    console.log('search:', this.form, this.options, this.options.columns)
  },
  methods: {
    handleFormSubmit () {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$notify.error({
            title: '错误',
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    handleFormReset () {
      this.$refs.searchForm.resetFields()
      console.log('form reseted:', this.form)
    }
  }
}
</script>
