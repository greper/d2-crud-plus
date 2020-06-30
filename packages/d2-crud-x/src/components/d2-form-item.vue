<template>
  <el-form-item
    :label="template.title"
    :prop="colKey"
  >
    <template v-if="template.slot === true">
      <slot :name="colKey+'FormSlot'" :form="formData" />
    </template>
    <el-input
      v-else-if="(!template.component) ||((!template.component.name) && (!template.component.render)) || template.component.name === 'el-input'"
      v-model="formData[colKey]"
      :disabled="handleFormComponentAttr(colKey,'disabled', false)"
      :readonly="handleFormComponentAttr(colKey,'readonly', false)"
      v-bind="(template.component.props?template.component.props:template.component)"
      @change="handleFormDataChange($event,colKey)"
    >
    </el-input>
    <render-custom-component
      v-else-if="template.component.name"
      v-model="formData[colKey]"
      :component-name="template.component.name"
      :disabled="handleFormComponentAttr(colKey,'disabled', false)"
      :readonly="handleFormComponentAttr(colKey,'readonly', false)"
      :props="template.component.props"
      :events="template.component.events"
      :slots="template.component.slots"
      @change="handleFormDataChange($event,colKey)"
      @ready="handleFormComponentReady($event,colKey)"
      @custom="handleFormComponentCustomEvent($event,colKey)"
    >
    </render-custom-component>
    <render-component
      v-else-if="template.component.render"
      :render-function="template.component.render"
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
    handleFormComponentAttr (key, attr, defaultValue) {
      let component = this.template.component
      if (component) {
        return this.handleAttribute(component[attr], defaultValue)
      }
      return defaultValue
    }
  }
}
</script>
