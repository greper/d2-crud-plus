<template>
    <d2-container>
        <template slot="header"></template>
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" ></crud-search>
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
                @dialog-open="handleDialogOpen"
                @row-edit="handleRowEdit"
                @row-add="handleRowAdd"
                @row-remove="handleRowRemove"
                @dialog-cancel="handleDialogCancel"
                @form-data-change="handleFormDataChange"
                @authz="authzHandle">
            <el-button slot="header" class="d2-mb-5" style="margin-bottom: 5px" size="small" type="primary" @click="addRow">新增</el-button>
        </d2-crud>
        <crud-footer ref="footer" slot="footer"
                     :current="crud.page.current"
                     :size="crud.page.size"
                     :total="crud.page.total"
                     @change="handlePaginationChange"
        >
        </crud-footer>
        <el-dialog title="授予角色"
                   :visible.sync="dialogPermissionVisible">
            <el-checkbox-group v-model="checked">
                <el-checkbox v-for="option in roleList"
                             :key="option.id"
                             :label="option.id" >{{option.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           @click="updatePermession(currentUserId)">确定
                </el-button>
            </div>
        </el-dialog>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList, AddObj, UpdateObj, DelObj, GetObj, GetRoleList, DoAuthz } from './api'
export default {
  name: 'User',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      roleList: [],
      checked: [],
      dialogPermissionVisible: false,
      currentUserId: undefined
    }
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
    infoRequest (row) {
      return GetObj(row.id)
    },
    authzHandle (event) {
      console.log('authz', event)
      GetRoleList().then(ret => {
        this.$set(this, 'roleList', ret.data)
        this.currentUserId = event.row.id
        return event.row.roles
      }).then((ret) => {
        if (ret == null) {
          ret = []
        }
        this.$set(this, 'checked', ret)
        this.dialogPermissionVisible = true
      })
    },
    updatePermession (userId) {
      DoAuthz(userId, this.checked).then(ret => {
        this.dialogPermissionVisible = false
        this.doRefresh()
      })
    }
  }
}
</script>
