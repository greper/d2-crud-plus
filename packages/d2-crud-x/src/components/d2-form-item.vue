<template>
  <el-form-item
    :label="template.title"
    :prop="colKey"
  >
    <template v-if="template.slot === true">
      <slot :name="colKey+'FormSlot'" :form="formData" />
    </template>
    <el-input
      v-else-if="(!getFormComponent()) ||((!getFormComponent().name) && (!getFormComponent().render)) || getFormComponent().name === 'el-input'"
      v-model="formData[colKey]"
      :disabled="getFormComponentAttr('disabled', false)"
      :readonly="getFormComponentAttr('readonly', false)"
      v-bind="(getFormComponent().props?getFormComponent().props:getFormComponent())"
      @change="handleFormDataChange($event,colKey)"
    >
    </el-input>
    <render-custom-component
      v-else-if="getFormComponent().name"
      v-model="formData[colKey]"
      :component-name="getFormComponent().name"
      :disabled="getFormComponentAttr('disabled', false)"
      :readonly="getFormComponentAttr('readonly', false)"
      :props="getFormComponent().props"
      :events="getFormComponent().events"
      :slots="getFormComponent().slots"
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
    </template>
  </el-form-item>
</template>

<script>
import utils from '../mixin/utils'
import renderComponent from '../components/renderComponent.vue'
import renderCustomComponent from '../components/renderCustomComponent.vue'
import _get from 'lodash.get'
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
  },
  methods: {
    /**
     * @description lodash.get
     */
    _get,
    handleFormDataChange (value, key) {
      this.$emit('form-data-change', { key: key, value: value, form: this.formData })
    },
    handleFormComponentReady (event, key) {
      this.$emit('form-component-ready', { event: event, key: key, form: this.formData })
    },
    handleFormComponentCustomEvent (event, key) {
      this.$emit('form-component-custom-event', { event: event, key: key, form: this.formData })
    },
    getFormComponent () {
      let component = this.template.component
      if (component) {
        return component
      }
      return {}
    },
    getFormComponentAttr (attr, defaultValue) {
      let component = this.template.component
      if (component) {
        return this.handleAttribute(component[attr], defaultValue)
      }
      return defaultValue
    }
  }
}
</script>
