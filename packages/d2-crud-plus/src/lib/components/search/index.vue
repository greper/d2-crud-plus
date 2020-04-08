<template>
  <el-form
      :inline="true"
      :model="form"
      ref="searchForm"
      size="small" class="d2p-search-form" >

    <el-form-item v-for="(item) in options.columns" :key="item.key"  :label="item.label" :prop="item.key"  >
      <template v-if="item.slot === true">
        <slot :name="item.key+'SearchSlot'" v-bind:form="form" ></slot>
      </template>
      <el-input
          v-else-if="item.component == null || item.component.name == null ||  item.component.name === 'el-input'"
          v-model="form[item.key]"
          :placeholder="item.label"
          :style="{width:(item.width?item.width:150+'px')}"/>
      <render-custom-component
          v-else-if="item.component && item.component.name"
          :component-name="item.component.name"
          v-model="form[item.key]"
          :props="item.component.props ? item.component.props : null"
          :style="{width:(item.width?item.width:150+'px')}"
      >
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
import { merge } from 'lodash'
export default {
  name: 'crud-search',
  components: { },
  props: {
    // 查询参数，options.form为表单初始值
    options: {
      type: Object
    }
  },
  data () {
    return {
      form: {
      }
    }
  },
  created () {
    if (this.options.form != null) {
      this.setForm(this.options.form)
    }
  },
  methods: {
    // 获取查询form表单值
    getForm () {
      return this.form
    },
    /**
     * 设置form值
     * @param form form对象
     * @param isMerge 是否与原有form值合并
     */
    setForm (form, isMerge = false) {
      if (isMerge) {
        merge(this.form, form)
      } else {
        this.$set(this, 'form', form)
      }
    },
    doSearch () {
      this.handleFormSubmit()
    },
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
    }
  }
}
</script>
<style lang="scss">
  .d2p-search-form{
    .el-form-item {
      margin-bottom: 8px;
    }
  }
</style>
