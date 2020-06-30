<template>
  <el-form-item
    :label="template.title"
    :prop="key"
  >
    <template v-if="template.slot === true">
      <slot :name="key+'FormSlot'" v-bind:form="formData" />
    </template>
    <el-input
      v-else-if="(!template.component) ||((!template.component.name) && (!template.component.render)) || template.component.name === 'el-input'"
      v-model="value"
      :disabled="handleFormComponentAttr(key,'disabled', false)"
      :readonly="handleFormComponentAttr(key,'readonly', false)"
      v-bind="(template.component.props?template.component.props:template.component)"
      @change="handleFormDataChange($event,key)"
    >
    </el-input>
    <render-custom-component
      v-else-if="template.component.name"
      v-model="value"
      :component-name="template.component.name"
      :disabled="handleFormComponentAttr(key,'disabled', false)"
      :readonly="handleFormComponentAttr(key,'readonly', false)"
      :props="template.component.props"
      :events="template.component.events"
      :slots="template.component.slots"
      @change="handleFormDataChange($event,key)"
      @ready="handleFormComponentReady($event,key)"
      @custom="handleFormComponentCustomEvent($event,key)"
    >
    </render-custom-component>
    <render-component
      v-else-if="template.component.render"
      :render-function="template.component.render"
      :scope="{key:key,value:value,row:formData}"
      @change="handleFormDataChange($event,key)"
    >
    </render-component>
    <template v-if="template.helper">
      <div class="form-item-helper" v-if=" typeof  template.helper === 'string'">{{template.helper}}</div>
      <div class="form-item-helper"  v-else-if="template.helper.slot === true">
        <slot :name="key+'HelperSlot'" v-bind:form="formData" />
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
    key: {
      type: String,
      required: true
    },
    value: {
      default: undefined
    }
  },
  methods: {
    /**
     * @description lodash.get
     */
    _get,
    handleFormDataChange (value, column) {
      column.value = value
      this.$emit('cell-data-change', column)
    },
    handleFormComponentReady (value, column) {
      column.value = value
      this.$emit('cell-data-change', column)
    },
    handleFormComponentCustomEvent (value, column) {
      column.value = value
      this.$emit('cell-data-change', column)
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
