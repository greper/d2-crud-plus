<template>
  <el-collapse-transition>
  <el-form
      v-if="options && !options.disabled && options.show"
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
        @change="handleSearchDataChange($event, { key: item.key, value: form[item.key], row: form, form:form })"
      >
      </el-input>
      <render-custom-component
        v-else-if="item.component && item.component.name"
        v-model="form[item.key]"
        :component-name="item.component.name"
        :props="getComponentProps(item)"
        :events="getComponentAttr(item,'events')"
        :style="{width:(item.width?item.width:150+'px')}"
        @change="handleSearchDataChange($event, { key: item.key, value: form[item.key], row: form, form:form })"
        @ready="handleSearchComponentReady($event, { key: item.key, value: form[item.key], row: form, form:form})"
        @custom="handleSearchComponentCustomEvent($event, { key: item.key, value: form[item.key], row: form, form:form})"
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
  </el-collapse-transition>
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
    // 合并默认查询formdata
    this.$set(this, 'form', form)

    // 构建防抖查询函数
    if (this.options.debounce !== false) {
      let wait = null
      if (this.options.debounce) {
        wait = this.options.debounce.wait
      }
      if (wait == null) {
        wait = 500
      }
      this.searchDebounce = lodash.debounce(this.handleFormSubmit, wait, this.options.debounce)
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
    getComponentAttr (item, attr, defVal) {
      if (item && item.component && item.component[attr]) {
        return item.component[attr]
      }
      return defVal
    },
    getComponentProps (item) {
      if (item && item.component && item.component.props) {
        return item.component.props
      }
      return {}
    },
    handleSearchDataChange (value, column) {
      column.value = value
      console.log('search data  change :', column)
      this.$emit('search-data-change', column)

      if (this.searchDebounce) {
        // 防抖查询
        this.searchDebounce()
      }
    },
    handleSearchComponentReady (value, column) {
      column.event = value
      this.$emit('search-component-ready', column)
    },
    handleSearchComponentCustomEvent (value, column) {
      column.event = value
      this.$emit('search-component-custom-event', column)
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
