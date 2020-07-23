<template>
    <d2-container>
<!--        <template slot="header">roomtype</template>-->
        <crud-search v-if="!crud.searchOptions.disabled" ref="search" :options="crud.searchOptions" @submit="handleSearch" ></crud-search>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners">
            <el-button slot="header" class="d2-mb-5" size="small" type="primary" @click="addRow">新增</el-button>
        </d2-crud-x>
        <crud-footer ref="footer"
                     :current="crud.page.current"
                     :size="crud.page.size"
                     :total="crud.page.total"
                     @change="handlePaginationChange"
        >
        </crud-footer>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { AddObj, GetList, UpdateObj, DelObj } from './api'
export default {
  name: 'hotelRoomType',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      return GetList(query)
    },
    addRequest (row) {
      return AddObj(row)
    },
    updateRequest (row) {
      return UpdateObj(row)
    },
    delRequest (row) {
      return DelObj(row.id)
    },
    doAfterRowChange (row) {
      d2CrudPlus.util.dict.clear()
      this.doRefresh()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
