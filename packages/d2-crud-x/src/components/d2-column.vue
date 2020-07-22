<template>
  <component
    :is="getTableColumnImpl(tableType)"
    v-if="item.show!==false"
    :title="handleAttribute(item.title, '')"
    :field="handleAttribute(item.key, null)"
    :label="handleAttribute(item.title, '')"
    :prop="handleAttribute(item.key, null)"
    v-bind="item">
  <template slot-scope="scope">
    <d2-cell :item="item" :row="scope.row" :rowIndex="scope.$index"
             @cell-data-change="handleCellDataChange"
             @cell-component-ready="handleCellComponentReady"
             @cell-component-custom-event="handleCellComponentCustomEvent"
    >
      <template slot-scope="scope" :slot="item.key+'Slot'">
        <template v-if="item.rowSlot">
          <slot :name="item.key+'Slot'" :row="scope.row"/>
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
    getRow () {
      return this.scope.row
    },
    handleCellDataChange (column) {
      this.$emit('cell-data-change', column)
    },
    handleCellComponentReady (column) {
      this.$emit('cell-component-ready', column)
    },
    handleCellComponentCustomEvent (column) {
      this.$emit('cell-component-custom-event', column)
    }
  }
}
</script>
