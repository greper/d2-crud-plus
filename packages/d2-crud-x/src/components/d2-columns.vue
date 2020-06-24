<template>
  <span>
    <template  v-for="(item, index) in columns">
      <el-table-column
      :key="index"
      :label="handleAttribute(item.title, '')"
      :prop="handleAttribute(item.key, null)"
      v-bind="item">
      <template slot-scope="scope">
        <d2-cell :item="item" :scope="scope">
          <template slot-scope="scope" :slot="item.key+'Slot'">
            <slot :name="item.key+'Slot'" :row="scope.row"/>
          </template>
        </d2-cell>
      </template>
        <d2-column v-if="item.children" :columns="item.children">
           <template v-for="(sub) in item.children"  slot-scope="scope" :slot="sub.key+'Slot'">
            <slot :name="sub.key+'Slot'" :row="scope.row"/>
           </template>
        </d2-column>
    </el-table-column>
    </template>
  </span>
</template>

<script>
import utils from '../mixin/utils'

export default {
  name: 'd2-columns',
  mixins: [
    utils
  ],
  components: {
  },
  props: {
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleCellDataChange () {

    }
  }
}
</script>
