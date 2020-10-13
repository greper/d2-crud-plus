<template>
  <el-form-item
    :label="template.title"
    :prop="colKey"
    v-bind="template.itemProps"
  >
    <template v-if="template.slot === true">
      <slot :name="colKey+'FormSlot'" :form="formData" :mode="$attrs.formMode" />
    </template>
    <template  v-else-if="template.formatter">{{template.formatter(formData, template,formData[colKey])}}</template>
    <render-custom-component
      v-else-if="getFormComponentName()"
      :value="_get(formData,colKey)"
      @input="_set(formData,colKey,$event)"
      ref="targetWrapper"
      :component-name="getFormComponentName()"
      :disabled="getFormComponentAttr('disabled', false)"
      :readonly="getFormComponentAttr('readonly', false)"
      :props="_component.props"
      :events="_component.events"
      :slots="_component.slots"
      :scoped-slots="_component.scopedSlots"
      :on="_component.on"
      :children="_component.children"
      v-bind="_component"
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
import _set from 'lodash.set'
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
        const cover = this.template.scopedComponent(this.getContext())
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
    _set,
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
      const component = this._component
      if (component) {
        return component
      }
      return {}
    },
    getFormComponentName () {
      const component = this.getFormComponent()
      if ((!component) || ((!component.name) && (!component.render)) || component.name === 'el-input') {
        return 'el-input'
      }
      return component.name
    },
    getFormComponentAttr (attr, defaultValue) {
      const component = this._component
      if (component) {
        return this.getFormFuncAttribute(component[attr], defaultValue)
      }
      return defaultValue
    },
    getFormFuncAttribute (attribute, defaultValue) {
      if (attribute === false || attribute === 0 || attribute === '') {
        return attribute
      }
      if (attribute && attribute instanceof Function) {
        return attribute(this.getContext())
      }
      return attribute || defaultValue
    },
    getComponentRef () {
      if (this.$refs && this.$refs.targetWrapper && this.$refs.targetWrapper.$refs) {
        return this.$refs.targetWrapper.$refs.target
      } else if (this.$refs && this.$refs.targetInput) {
        return this.$refs.targetInput
      }
    },
    getContext () {
      const context = {
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
