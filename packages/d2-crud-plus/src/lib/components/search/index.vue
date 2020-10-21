<template>
  <el-collapse-transition>
  <el-form
      v-if="options && !options.disabled && options.show"
      :inline="true"
      :model="form"
      ref="searchForm"
      v-bind="options" class="d2p-search-form" >
     <slot name="prefix" :form="this.form"></slot>
     <el-form-item
       v-for="(item) in currentColumns" :key="item.key"
       v-if="getItemAttr(item,'show',true)"
       :label="item.title?item.title:item.label" :prop="item.key">
        <template v-if="item.slot === true">
          <slot :name="item.key+'SearchSlot'" :form="form" />
        </template>
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
          :placeholder="getComponentProps().placeholder?getComponentProps().placeholder:getComponentAttr(item,'placeholder')"
          :disabled="getComponentAttr(item,'disabled', false)"
          :readonly="getComponentAttr(item,'readonly', false)"
          v-bind="item.component"
          :style="_style(item)"
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
    <el-form-item class="search-btns">

      <template
        v-for="(item, index) in _buttons"
      >
        <d2p-button :key="index"
                   v-if="item.show"
                   :disabled="item.disabled"
                   :icon="item.icon"
                   @click="item.doClick()"
                   :label="item.text"
                   v-bind="item"
        />
      </template>
    </el-form-item>
    <slot name="suffix" :form="this.form"></slot>
  </el-form>
  </el-collapse-transition>
</template>

<script>
import lodash from 'lodash'
import _get from 'lodash.get'
import _set from 'lodash.set'
import d2pButton from '../basic/d2p-button/component'
export default {
  name: 'crud-search',
  components: { d2pButton },
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
    },
    // 查询字段配置
    columns: {
      type: Array
    },
    // 文本配置
    // {search: '查询',reset: '重置'}
    text: {
      type: Object
    }
  },
  computed: {
    _text () {
      const def = {
        search: '查询',
        reset: '重置'
      }
      lodash.merge(def, this.text)
      return def
    },
    _columns () {
      return this.columns ? this.columns : this.options.columns
    },
    _buttons () {
      const btns = []
      const defBtnOptions = { search: {}, reset: {} }
      lodash.merge(defBtnOptions, this.options.buttons)
      if (defBtnOptions.search) {
        btns.push({
          show: true,
          type: 'primary',
          disabled: false,
          doClick: () => {
            this.handleFormSubmit()
          },
          order: 1,
          icon: 'el-icon-search',
          text: this._text.search,
          ...defBtnOptions.search
        })
      }
      if (defBtnOptions.reset) {
        btns.push({
          show: true,
          disabled: false,
          doClick: () => {
            this.handleFormReset()
          },
          icon: 'el-icon-refresh',
          text: this._text.reset,
          order: 2,
          ...defBtnOptions.reset
        })
      }
      btns.sort((a, b) => { return a.order - b.order })
      return btns
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
    columns: {
      handler (value) {
        this.setColumns(value)
      }
    }
  },
  created () {
    this.setColumns(this._columns)
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
  mounted () {
    const unwatch = this.$watch('options.columns', (value) => {
      this.setColumns(value)
    })
    const unwatch2 = this.$watch('options', (value) => {
      this.setColumns(value.columns)
    })
    this.$once('hook:beforeDestroy', function () {
      // 销毁后取消观察
      unwatch()
      // 销毁后取消观察
      unwatch2()
    })
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
    _style (item) {
      const defStyle = { width: this._width(item) }
      if (item.component && item.component.style) {
        lodash.merge(defStyle, item.component.style)
      }
      return defStyle
    },
    setColumns (columns) {
      this.currentColumns = columns
      const form = {}
      for (const item of this.currentColumns) {
        _set(form, item.key, undefined)
        if (item.value !== undefined) {
          _set(form, item.key, item.value)
        } else {
          if (item.component) {
            if (item.component.value !== undefined) {
              _set(form, item.key, item.component.value)
            } else if (item.component.props && item.component.props.value !== undefined) {
              _set(form, item.key, item.component.props.value)
            }
          }
        }
      }
      lodash.merge(form, this.options.form)
      this.setForm(form)
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
      const baseForm = {}
      if (isMerge) {
        lodash.merge(baseForm, this.form, form)
      } else {
        lodash.merge(baseForm, form)
      }
      this.$set(this, 'form', baseForm)
    },
    doSearch () {
      this.handleFormSubmit()
    },
    handleFormSubmit () {
      if (this.searchDebounce) {
        // 防抖查询取消
        this.searchDebounce.cancel()
      }
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
      // 表单重置事件
      this.$emit('reset')
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
    getItemAttr (item, attr, defVal) {
      if (item && item[attr] != null) {
        const attrObj = item[attr]
        if (attrObj instanceof Function) {
          return attrObj(this.getContext(item.key))
        }
        return attrObj
      }
      return defVal
    },
    getComponentAttr (item, attr, defVal) {
      if (item && item.component != null && item.component[attr] != null) {
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
