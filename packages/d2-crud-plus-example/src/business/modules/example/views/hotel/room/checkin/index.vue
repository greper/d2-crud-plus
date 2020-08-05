<template>
  <d2-container>
<!--    <template slot="header">checkin</template>-->
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" ></crud-search>
    <d2-crud-x
        ref="d2Crud"
        :pagination="null"
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
import { GetList } from './api'
import crudEditMixin from './crud-edit-mixin'
export default {
  name: 'hotelRoomCheckin',
  mixins: [crudEditMixin],
  data () {
    return {
    }
  },
  methods: {
    pageRequest (query) {
      return GetList(query)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
