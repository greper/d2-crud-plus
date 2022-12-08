<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      批量删除
      <example-helper title="自定义组件帮助说明" >
          <div>
           右下角查看源码
          </div>
      </example-helper>
    </template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
    >

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
      </div>

      <span slot="PaginationPrefixSlot" class="prefix" >
        <el-button class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length==0"  />
      </span>

    </d2-crud-x>
  </d2-container>
</template>

<script>
import * as api from './api'
import { crudOptions } from './crud'
import _ from 'lodash'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formBatchDel',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      multiPageSelected: []
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      this.selectBack = true
      return api.GetList(query)
    },
    addRequest (row) {
      return api.AddObj(row)
    },
    updateRequest (row) {
      return api.UpdateObj(row)
    },
    delRequest (row) {
      return api.DelObj(row.id)
    },
    batchDelRequest (ids) {
      return api.BatchDel(ids)
    },

    async doAfterRefresh () {
      await this.$nextTick()
      this.selectBack = true
      const data = this.getD2CrudTableData()
      for (const item of this.multiPageSelected) {
        const found = _.find(data, (record) => {
          return item.id === record.id
        })
        if (found) {
          this.getD2CrudTable().toggleRowSelection(found, true)
        }
      }
      this.multipleSelection = this.multiPageSelected
      this.selectBack = false
    },
    doSelectionChange (selection) {
      if (this.selectBack) {
        return
      }
      const data = this.getD2CrudTableData()
      const unselectedIds = _.filter(data, (record) => {
        const found = selection.find((item) => {
          return item.id === record.id
        })
        return found == null
      }).map(item => { return item.id })
      console.log('unselectedIds', unselectedIds)
      this.multiPageSelected = _.filter(this.multiPageSelected, (record) => {
        return !_.includes(unselectedIds, record.id)
      })
      console.log('selected1', this.multiPageSelected)
      this.multiPageSelected = _.union(this.multiPageSelected, selection, (item) => {
        return item.id
      })
      console.log('selected2', this.multiPageSelected)
      this.multipleSelection = this.multiPageSelected
    }
  },
  doSelectAll (selection) {
    this.doSelectionChange(selection)
  }
}
</script>
