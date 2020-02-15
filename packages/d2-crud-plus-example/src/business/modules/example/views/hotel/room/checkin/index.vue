<template>
  <d2-container>
<!--    <template slot="header">checkin</template>-->
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" ></crud-search>
    <d2-crud
        ref="d2Crud"
        :columns="crud.columns"
        :data="crud.list"
        :rowHandle="crud.rowHandle"
        edit-title="修改"
        :add-template="crud.addTemplate"
        :add-rules="crud.addRules"
        :edit-template="crud.editTemplate"
        :edit-rules="crud.editRules"
        :form-options="crud.formOptions"
        :options="crud.options"
        :loading="crud.loading"
        selection-row
        @selection-change="handleSelectionChange"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange">
      <el-button slot="header" class="d2-mb-5" size="small" type="primary" @click="addRow">新增</el-button>
    </d2-crud>
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
  name: 'checkin',
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
