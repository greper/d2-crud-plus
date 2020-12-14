<template>
  <component
    :is="getTableColumnImpl(tableType)"
    v-if="getAttr(item,'show',true)!==false"
    v-bind="forColumnBindProps(item)">
  <template slot-scope="scope">
    <d2-cell :item="item" :row="scope.row" :rowIndex="thisIsVxeTable?scope.$rowIndex:scope.$index"
             @cell-data-change="handleCellDataChange"
             @cell-component-ready="handleCellComponentReady"
             @cell-component-custom-event="handleCellComponentCustomEvent"
    >
      <template slot-scope="scope2" :slot="item.key+'Slot'">
        <template v-if="item.rowSlot">
          <slot :name="item.key+'Slot'" :row="scope2.row" :index="scope2.index" :rowIndex="scope2.index"/>
        </template>
      </template>
    </d2-cell>
  </template>
    <template v-if="item.children && item.children.length>0">
      <d2-column  v-for="(sub,index) in item.children" :key="index" :item="sub"
                  @cell-data-change="handleCellDataChange"
                  @cell-component-ready="handleCellComponentReady"
                  @cell-component-custom-event="handleCellComponentCustomEvent"
      >
        <template slot-scope="scope" :slot="sub.key+'Slot'">
          <template v-if="sub.rowSlot">
            <slot :name="sub.key+'Slot'" :row="scope.row"/>
          </template>
        </template>
      </d2-column>
    </template>
</component>
</template>

<script>
import utils from '../mixin/utils'
import D2Cell from './d2-cell'
import RenderComponent from './renderComponent'
import _get from 'lodash.get'
import _set from 'lodash.set'
export default {
  name: 'd2-column',
  mixins: [
    utils
  ],
  components: {
    RenderComponent,
    D2Cell
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    tableType: {
      type: String,
      required: false
    }
  },
  methods: {
    _get,
    _set,
    handleCellDataChange (column) {
      this.$emit('cell-data-change', column)
    },
    handleCellComponentReady (column) {
      this.$emit('cell-component-ready', column)
    },
    handleCellComponentCustomEvent (column) {
      this.$emit('cell-component-custom-event', column)
    },
    forColumnBindProps (item) {
      const targetItem = { ...item }
      if (this.thisIsVxeTable) {
        targetItem.title = this.handleAttribute(item.title, '')
        targetItem.field = this.handleAttribute(item.key, null)
      } else {
        targetItem.label = this.handleAttribute(item.title, '')
        targetItem.prop = this.handleAttribute(item.key, null)
        delete targetItem.title
      }
      return targetItem
    }
  }
}
</script>
