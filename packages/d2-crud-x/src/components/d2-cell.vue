<template>
  <span v-if="getTemplateComponentAttr(item,'show', true,getContext(item.key))">
    <template v-if="!isLineEdit()">
        <template v-if="item.rowSlot === true">
          <slot :name="item.key+'Slot'" :rowIndex="rowIndex" :index="rowIndex" :row="row" :isLineEdit="isLineEdit()"/>
        </template>
       <render-custom-component
         v-else-if="item.component && item.component.name"
         :value="_get(row,item.key)"
         @input="_set(row,item.key,$event)"
         :component-name="item.component.name"
         :disabled="getTemplateComponentAttr(item,'disabled', false,getContext(item.key))"
         :readonly="getTemplateComponentAttr(item,'readonly', false,getContext(item.key))"
         :props="item.component.props ? item.component.props : null"
         :scope="{$index:rowIndex,index:rowIndex,row:row}"
         v-bind="item.component"
         @change="handleCellDataChange($event, {rowIndex: rowIndex, key: item.key, value: row[item.key], row: row})"
         @ready="handleCellComponentReady($event, {rowIndex: rowIndex, key: item.key, value: row[item.key], row: row})"
         @custom="handleCellComponentCustomEvent($event, {rowIndex: rowIndex, key: item.key, value: row[item.key], row: row})"
       />
       <render-component
         v-else-if="item.component && item.component.render"
         :scope="{rowIndex: rowIndex, key: item.key, value: row[item.key], row: row}"
         :render-function="item.component.render"
         @change="handleCellDataChange($event, {rowIndex: rowIndex, key: item.key, value: row[item.key], row: row})"
       />
        <template v-else>{{ item.formatter ? item.formatter(row, item, _get(row, item.key), rowIndex) : _get(row, item.key) }}</template>
      </template>
    <component v-else
               :is="isNeedValidation()?'el-form-item':'div'"
                  :prop="item.key"
                  :rules="getEditRules()"
                  v-bind="getItem().itemProps"
    >
        <template v-if="getItem().slot === true">
          <slot :name="item.key+'Slot'" :rowIndex="rowIndex" :index="rowIndex" :row="getRow()" :isLineEdit="isLineEdit()"/>
        </template>
        <render-custom-component
          v-else-if="getItem().component "
          :value="_get(getRow(),item.key)"
          @input="_set(getRow(),item.key,$event)"
          :component-name="getFormComponentName()"
          :disabled="getTemplateComponentAttr(getItem(),'disabled', false,getContext(item.key))"
          :readonly="getTemplateComponentAttr(getItem(),'readonly', false,getContext(item.key))"
          :props="getItem().component.props ? getItem().component.props : null"
          :scope="{$index:rowIndex,row:getRow()}"
          v-bind="getItem().component"
          @change="handleCellDataChange($event, {rowIndex: rowIndex, key: item.key, value: getRow()[item.key], row: getRow()})"
          @ready="handleCellComponentReady($event, {rowIndex: rowIndex, key: item.key, value: getRow()[item.key], row: getRow()})"
          @custom="handleCellComponentCustomEvent($event, {rowIndex: rowIndex, key: item.key, value: getRow()[item.key], row: getRow()})"
        />
    </component>
  </span>
</template>

<script>
import utils from '../mixin/utils'
import renderComponent from '../components/renderComponent.vue'
import renderCustomComponent from '../components/renderCustomComponent.vue'
import _get from 'lodash.get'
import _set from 'lodash.set'

export default {
  name: 'd2-cell',
  mixins: [
    utils
  ],
  created() {
    if(this.d2CrudContext){
      if(this.rowIndex || this.rowIndex === 0) {
        console.log("cell:" + this.rowIndex + '_' + this.item.key)
        this.d2CrudContext.d2Crud.cells['row' + this.rowIndex + '_' + this.item.key] = this
      }
    }
  },
  provide: function () {
    return {
      d2CrudContext: {
        getForm: this.getRow
      }
    }
  },
  inject: {
    d2CrudContext: {
      default () {
        return undefined
      }
    }
  },
  components: {
    renderComponent, renderCustomComponent
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    rowIndex: {
      required: false
    }
  },
  methods: {
    /**
     * @description lodash.get
     */
    _get,
    _set,
    getRow () {
      const lineEditor = this.isLineEdit()
      if (lineEditor) {
        return lineEditor.form
      }
      return this.row
    },
    getItem () {
      const lineEditor = this.isLineEdit()
      if (lineEditor) {
        const template = lineEditor.template[this.item.key]
        if (template) {
          return template
        }
        return {}
      }
      return this.item
    },
    isNeedValidation () {
      const lineEditor = this.isLineEdit()
      if (lineEditor) {
        return lineEditor.validation
      }
      return false
    },
    getEditRules () {
      const lineEditor = this.isLineEdit()
      if (lineEditor) {
        const rules = lineEditor.rules[this.item.key]
        return rules
      }
      return null
    },
    getFormComponentName () {
      const name = this.getItem().component.name
      if (name) {
        return name
      }
      return 'el-input'
    },
    handleCellDataChange (value, column) {
      column.value = value
      this.$emit('cell-data-change', column)
    },
    handleCellComponentReady ($event, column) {
      column.event = $event
      this.$emit('cell-component-ready', column)
    },
    handleCellComponentCustomEvent ($event, column) {
      column.event = $event
      this.$emit('cell-component-custom-event', column)
    },
    getContext (key) {
      const context = {
        mode: 'row',
        key: key,
        value: this.row[key],
        form: this.row,
        column: this.item
      }
      return context
    },
    isLineEdit () {
      if (this.d2CrudContext && this.d2CrudContext.getLineEditor) {
        const editor = this.d2CrudContext.getLineEditor()
        if (editor && editor.active && editor.index === this.rowIndex) {
          return editor
        }
      }
      return false
    }
  }
}
</script>
