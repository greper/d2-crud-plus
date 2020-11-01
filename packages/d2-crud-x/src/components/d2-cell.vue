<template>
  <span v-if="getTemplateComponentAttr(item,'show', true,getContext(item.key))">
    <template v-if="!isLineEdit()">
        <template v-if="item.rowSlot === true">
          <slot :name="item.key+'Slot'" :row="row" :isLineEdit="isLineEdit()"/>
        </template>
       <render-custom-component
         v-else-if="item.component && item.component.name"
         :value="_get(row,item.key)"
         @input="_set(row,item.key,$event)"
         :component-name="item.component.name"
         :disabled="getTemplateComponentAttr(item,'disabled', false,getContext(item.key))"
         :readonly="getTemplateComponentAttr(item,'readonly', false,getContext(item.key))"
         :props="item.component.props ? item.component.props : null"
         :scope="{$index:rowIndex,row:row}"
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
    <template v-else>
      <template v-if="getItem().slot === true">
          <slot :name="item.key+'Slot'" :row="getRow()" :isLineEdit="isLineEdit()"/>
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
    </template>
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
        if (editor && editor.index === this.rowIndex) {
          return editor
        }
      }
      return false
    }
  }
}
</script>
