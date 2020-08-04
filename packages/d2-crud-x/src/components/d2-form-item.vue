<template>
  <el-form-item
    :label="template.title"
    :prop="colKey"
  >
    <template v-if="template.slot === true">
      <slot :name="colKey+'FormSlot'" :form="formData" />
    </template>
    <template  v-else-if="template.formatter">{{template.formatter(formData, template,formData[colKey])}}</template>
    <el-input
      v-else-if="(!getFormComponent()) ||((!getFormComponent().name) && (!getFormComponent().render)) || getFormComponent().name === 'el-input'"
      v-model="formData[colKey]"
      ref="targetInput"
      :disabled="getFormComponentAttr('disabled', false)"
      :readonly="getFormComponentAttr('readonly', false)"
      v-bind="(getFormComponent().props?getFormComponent().props:getFormComponent())"
      @change="handleFormDataChange($event,colKey)"
    >
    </el-input>
    <render-custom-component
      v-else-if="getFormComponent().name"
      v-model="formData[colKey]"
      ref="targetWrapper"
      :component-name="getFormComponent().name"
      :disabled="getFormComponentAttr('disabled', false)"
      :readonly="getFormComponentAttr('readonly', false)"
      :props="getFormComponent().props"
      :events="getFormComponent().events"
      :slots="getFormComponent().slots"
      :scoped-slots="getFormComponent().scopedSlots"
      :on="getFormComponent().on"
      :children="getFormComponent().children"
      @change="handleFormDataChange($event,colKey)"
      @ready="handleFormComponentReady($event,colKey)"
      @custom="handleFormComponentCustomEvent($event,colKey)"
    >
    </render-custom-component>
    <render-component
      v-else-if="getFormComponent().render"
      :render-function="getFormComponent().render"
      :scope="{key: colKey, value: formData[colKey], row: formData}"
      @change="handleFormDataChange($event,colKey)"
    >
    </render-component>
    <template v-if="template.helper">
      <div class="form-item-helper" v-if=" typeof  template.helper === 'string'">{{template.helper}}</div>
      <div class="form-item-helper"  v-else-if="template.helper.slot === true">
        <slot :name="colKey+'HelperSlot'" :form="formData" />
      </div>
      <div class="form-item-helper"  v-else-if="template.helper.render">
        <render-component :render-function="template.helper.render"/>
      </div>
    </template>
  </el-form-item>
</template>

<script>
import utils from '../mixin/utils'
import renderComponent from '../components/renderComponent.vue'
import renderCustomComponent from '../components/renderCustomComponent.vue'
import _get from 'lodash.get'
import _merge from 'lodash.merge'
import _cloneDeep from 'lodash.clonedeep'
export default {
  name: 'd2-form-item',
  mixins: [
    utils
  ],
  components: {
    renderComponent, renderCustomComponent
  },
  props: {
    template: {
      type: Object,
      required: true
    },
    formData: {
      type: Object
    },
    colKey: {
      type: String
    }
  },
  computed: {
    _component () {
      let component = this.template.component
      if (component == null) {
        component = {}
      }
      if (this.template.scopedComponent) {
        let cover = this.template.scopedComponent(this.getContext())
        if (cover) {
          component = _cloneDeep(component)
          _merge(component, cover)
        }
      }
      return component
    }
  },
  methods: {
    /**
     * @description lodash.get
     */
    _get,
    handleFormDataChange ({ value, component }, key) {
      this.$emit('form-data-change', { key: key, value: value, form: this.formData, component: component })
    },
    handleFormComponentReady ({ value, component }, key) {
      this.$emit('form-component-ready', { event: value, key: key, form: this.formData, component: component })
    },
    handleFormComponentCustomEvent (event, key) {
      this.$emit('form-component-custom-event', { event: event, key: key, form: this.formData })
    },
    getFormComponent () {
      let component = this._component
      if (component) {
        return component
      }
      return {}
    },
    getFormComponentAttr (attr, defaultValue) {
      let component = this._component
      if (component) {
        return this.handleAttribute(component[attr], defaultValue, this.getContext())
      }
      return defaultValue
    },
    getComponentRef () {
      if (this.$refs && this.$refs.targetWrapper && this.$refs.targetWrapper.$refs) {
        return this.$refs.targetWrapper.$refs.target
      } else if (this.$refs && this.$refs.targetInput) {
        return this.$refs.targetInput
      }
    },
    getContext () {
      let context = {
        mode: this.$attrs.formMode,
        key: this.colKey,
        value: this.formData[this.colKey],
        form: this.formData,
        component: this.getComponentRef(),
        column: this.template,
        getColumn: this.$attrs.getColumn
      }
      return context
    }
  }
}
</script>
