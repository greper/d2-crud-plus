<template>
  <el-collapse-transition>
  <el-form
      v-if="options && !options.disabled && options.show"
      :inline="true"
      :model="form"
      ref="searchForm"
      v-bind="options"
      size="small" class="d2p-search-form" >
    <slot name="prefix" :form="this.form"></slot>
    <el-form-item v-for="(item) in currentColumns" :key="item.key"  :label="item.title?item.title:item.label" :prop="item.key"  >
      <template v-if="item.slot === true">
        <slot :name="item.key+'SearchSlot'" :form="form" />
      </template>
<!--      <el-input-->
<!--        v-else-if="isInput(item)"-->
<!--        v-model="form[item.key]"-->
<!--        :placeholder="item.label"-->
<!--        v-bind="getComponentProps(item)"-->
<!--        :style="{width:_width(item)}"-->
<!--        @change="handleSearchDataChange($event, { key: item.key, value: form[item.key], row: form, form:form })"-->
<!--      >-->
<!--      </el-input>-->
      <render-custom-component
        v-else-if="isRenderCustomComponent(item)"
        :value="_get(form,item.key)"
        @input="_set(form,item.key,$event)"
        :ref="'form_item_'+item.key"
        :component-name="item.component.name?item.component.name:'el-input'"
        :props="getComponentProps(item)"
        :slots="getComponentAttr(item,'slots')"
        :scoped-slots="getComponentAttr(item,'scopedSlots')"
        :events="getComponentAttr(item,'events')"
        :on="getComponentAttr(item,'on')"
        :children="getComponentAttr(item,'children')"
        :style="{width:_width(item)}"
        :placeholder="getComponentProps().placeholder?getComponentProps().placeholder:getComponentAttr(item,'placeholder')"
        :disabled="getComponentAttr(item,'disabled', false)"
        :readonly="getComponentAttr(item,'readonly', false)"
        @change="handleSearchDataChange($event, { key: item.key, value: form[item.key], row: form, form:form })"
        @ready="handleSearchComponentReady($event, { key: item.key, value: form[item.key], row: form, form:form})"
        @custom="handleSearchComponentCustomEvent($event, { key: item.key, value: form[item.key], row: form, form:form})"
      >
      </render-custom-component>
      <render-component
        v-else-if="item.component && item.component.render"
        :render-function="item.component.render"
        :scope="{key: item.key, value: form[item.key], row: form}"
        :style="{width:_width(item)}"
      >
      </render-component>

    </el-form-item>
    <slot :form="this.form"></slot>
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
    <slot name="suffix" :form="this.form"></slot>
  </el-form>
  </el-collapse-transition>
</template>

<script>
import lodash from 'lodash'
import _get from 'lodash.get'
import _set from 'lodash.set'
export default {
  name: 'crud-search',
  provide: function () {
    return {
      d2CrudContext: {
        getForm: this.getForm
      }
    }
  },
  props: {
    // 查询参数，options.form为表单初始值
    options: {
      type: Object
    }
  },
  data () {
    return {
      reset: undefined,
      form: {},
      currentColumns: undefined
    }
  },
  watch: {
    'options.columns': (value) => {
      this.setColumns(value)
    }
  },
  created () {
    this.setColumns(this.options.columns)
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
    _get,
    _set,
    _width (item) {
      if (!item.width) {
        return '150px'
      }
      if (!isNaN(item.width)) {
        return item.width + 'px'
      }
      return item.width
    },
    setColumns (columns) {
      this.currentColumns = lodash.cloneDeep(columns)
      const form = {}
      for (const item of this.currentColumns) {
        form[item.key] = item.component ? item.component.value : undefined
      }
      let reset = {}
      if (this.options.form) {
        reset = lodash.cloneDeep(this.options.form)
      }
      lodash.merge(form, reset)
      // 合并默认查询formdata
      this.$set(this, 'form', form)
    },
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
          this.$emit('submit', lodash.cloneDeep(this.form))
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

      if (this.options && this.options.reset) {
        this.options.reset({ form: this.form })
      }
      if (this.searchDebounce) {
        // 防抖查询
        this.searchDebounce()
      }
    },
    isInput (item) {
      return !item.component || (!item.component.name && !item.component.render) || item.component.name === 'el-input'
    },
    isRenderCustomComponent (item) {
      if (this.isInput(item)) {
        return true
      }
      return item.component && item.component.name
    },
    getComponentAttr (item, attr, defVal) {
      if (item && item.component && item.component[attr]) {
        const attrObj = item.component[attr]
        if (attrObj instanceof Function) {
          return attrObj(this.getContext(item.key))
        }
        return attrObj
      }
      return defVal
    },
    getComponentProps (item) {
      if (item && item.component && item.component.props) {
        return item.component.props
      }
      return {}
    },
    handleSearchDataChange ({ value, component }, column) {
      column.value = value
      column.component = component
      column.getColumn = this.getColumnTemplate

      if (this.options.valueChange) {
        const target = this.getColumnTemplate(column.key)
        if (target && target.valueChange) {
          target.valueChange(column.key, value, this.form, {
            getColumn: this.getColumnTemplate,
            mode: 'search',
            component: component,
            refs: this.$refs,
            getComponent: this.getComponentRef
          })
        }
      }
      console.log('search value change:', column.key)
      this.$emit('search-data-change', column)

      if (this.searchDebounce) {
        // 防抖查询
        this.searchDebounce()
      }
    },
    handleSearchComponentReady ({ value, component }, column) {
      column.event = value
      column.component = component
      this.$emit('search-component-ready', column)
    },
    handleSearchComponentCustomEvent (value, column) {
      column.event = value
      this.$emit('search-component-custom-event', column)
    },
    getColumnTemplate (key) {
      console.log('getColumn', this.currentColumns)
      for (const item of this.currentColumns) {
        if (item.key === key) {
          return item
        }
      }
    },
    getComponentRef (key) {
      if (this.$refs) {
        const wrapper = this.$refs['form_item_' + key]
        if (wrapper && wrapper.length > 0 && wrapper[0]) {
          return wrapper[0].getComponentRef()
        }
      }
    },
    getContext (key) {
      const context = {
        mode: 'search',
        key: key,
        value: this.form[key],
        form: this.form,
        getComponent: this.getComponentRef,
        component: this.getComponentRef(key),
        column: this.getColumn(key),
        getColumn: this.getColumn
      }
      return context
    },
    getColumn (key) {
      return this.currentColumns[key]
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
