<template>
  <el-form
      :inline="true"
      :model="form"
      ref="searchForm"
      size="small" class="d2p-search-form" >

    <el-form-item v-for="(item) in options.columns" :key="item.key"  :label="item.label" :prop="item.key"  >
      <template v-if="item.slot === true">
        <slot :name="item.key+'SearchSlot'" :form="form" />
      </template>
      <el-input
        v-else-if="isInput(item)"
        v-model="form[item.key]"
        :placeholder="item.label"
        v-bind="getComponentProps(item)"
        :style="{width:(item.width?item.width:150+'px')}"
      >
      </el-input>
      <render-custom-component
        v-else-if="item.component && item.component.name"
        v-model="form[item.key]"
        :component-name="item.component.name"
        :props="getComponentProps(item)"
        :style="{width:(item.width?item.width:150+'px')}"
        @change="handleChanged"
      >
      </render-custom-component>
      <render-component
        v-else-if="item.component && item.component.render"
        :render-function="item.component.render"
        :scope="{key: item.key, value: form[item.key], row: form}"
        :style="{width:(item.width?item.width:150+'px')}"
      >
      </render-component>

    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          @click="handleFormSubmit">
        <d2-icon name="search"/>
        查询
      </el-button>
      <el-button
        @click="handleFormReset">
        <d2-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import lodash from 'lodash'
export default {
  name: 'crud-search',
  props: {
    // 查询参数，options.form为表单初始值
    options: {
      type: Object
    }
  },
  data () {
    return {
      reset: undefined,
      form: {}
    }
  },
  created () {
    let form = {}
    for (let item of this.options.columns) {
      form[item.key] = item.component ? item.component.value : undefined
    }
    let reset = {}
    if (this.options.form) {
      reset = lodash.cloneDeep(this.options.form)
    }
    lodash.merge(form, reset)
    this.$set(this, 'form', form)
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
        lodash.merge(this.form, form)
        this.$set(this, 'form', this.form)
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
    },
    isInput (item) {
      return !item.component || (!item.component.name && !item.component.render) || item.component.name === 'el-input'
    },
    getComponentProps (item) {
      if (item.component && item.component.props) {
        return item.component.props
      }
      return {}
    },
    handleChanged (event) {
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
