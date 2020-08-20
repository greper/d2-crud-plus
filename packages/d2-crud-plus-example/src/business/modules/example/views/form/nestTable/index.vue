<template>
  <d2-container >
    <template slot="header">嵌套表格</template>

    <el-row :gutter="20" :style="{height:'100%'}">
      <el-col :span="12" :style="{height:'100%'}">
        <d2-crud-x
          ref="d2Crud"
          v-bind="_crudProps"
          v-on="_crudListeners"
        >
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @search-data-change="handleSearchDataChange"  />
            <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>
          <div slot="nestIdFormSlot" slot-scope="scope">
            <sub-table :value="scope.form.nestId" @selected="nestIdSelected($event,scope.form)"></sub-table>
          </div>
        </d2-crud-x>
      </el-col>

      <el-col :span="12" :style="{height:'100%'}">
        <apposition-table></apposition-table>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList, AddObj, UpdateObj, DelObj } from './api'
import subTable from './subTable'
import appositionTable from './appositionTable'

export default {
  name: 'formNestTable',
  mixins: [d2CrudPlus.crud],
  components: { subTable, appositionTable },
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
    nestIdSelected (value, form) {
      console.log('nestIdSelected', value, form)
      this.$emit('selected', value)
      form.nestId = value.id
      this.currentNestName = value.name
    }
  }
}
</script>
