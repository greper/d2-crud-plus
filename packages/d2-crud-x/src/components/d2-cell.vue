<template>
  <span>
      <template v-if="item.rowSlot === true">
        <slot :name="item.key+'Slot'" :row="scope.row"/>
      </template>
      <render-custom-component
        v-else-if="item.component && item.component.name"
        v-model="scope.row[item.key]"
        :component-name="item.component.name"
        :props="item.component.props ? item.component.props : null"
        @change="handleCellDataChange($event, {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
        :scope="scope">
      </render-custom-component>
      <render-component
        v-else-if="item.component && item.component.render"
        :render-function="item.component.render"
        @change="handleCellDataChange($event, {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
        :scope="{key:item.key,value:scope.row[item.key],row:scope.row}"
      >
      </render-component>
      <template v-else>{{item.formatter ? item.formatter(scope.row, scope.column, _get(scope.row, item.key), scope.$index) : _get(scope.row, item.key)}}</template>
  </span>
</template>

<script>
import utils from '../mixin/utils'
import renderComponent from '../components/renderComponent.vue'
import renderCustomComponent from '../components/renderCustomComponent.vue'
import _get from 'lodash.get'
export default {
  name: 'd2-cell',
  mixins: [
    utils
  ],
  components: {
    renderComponent, renderCustomComponent
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    scope: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * @description lodash.get
     */
    _get,
    handleCellDataChange (value, column) {
      column.value = value
      this.$emit('cell-data-change', column)
    }
  }
}
</script>
