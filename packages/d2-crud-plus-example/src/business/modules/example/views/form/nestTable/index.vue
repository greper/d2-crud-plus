<template>
  <d2-container >
    <template slot="header">嵌套表格</template>

    <el-row :gutter="20" style="height:100%">
      <el-col :span="12" style="height:100%" class="leftTable">
        <d2-crud-x
          ref="d2Crud"
          v-bind="_crudProps"
          v-on="_crudListeners"
        >
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @search-data-change="handleSearchDataChange"  />
            <el-button class="d2-mr-5" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
            <span style="color:gray;font-size: 12px">点击新增查看嵌套表格示例</span>
            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>
          <div slot="nestIdFormSlot" slot-scope="scope">
            <!--  form slot 嵌入子表格，把子表格当做一个普通的组件来用，子表格记得要设置高度 -->
            <!-- form slot 文档 http://greper.gitee.io/d2-crud-plus/guide/slot.html -->
            <sub-table :value="scope.form.nestId" @selected="nestIdSelected($event,scope.form)"></sub-table>
          </div>
        </d2-crud-x>
      </el-col>

      <el-col :span="12" style="height:100%" class="rightTable">
        <!-- 并列表格 --->
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
