<template>
  <d2-container>
<!--    <template slot="header">房间管理</template>-->
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" ></crud-search>
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
import { AddRoom, GetRoomList, UpdateRoom, DelRoom } from './api'
export default {
  name: 'hotelRoomList',
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
      return GetRoomList(query)
    },
    addRequest (row) {
      return AddRoom(row)
    },
    updateRequest (row) {
      return UpdateRoom(row)
    },
    delRequest (row) {
      return DelRoom(row.id)
    }
  }
}
</script>
<style lang="scss" scoped>
  div.d2-crud .d2-crud-body{
    padding-top:0 !important;
  }
</style>
