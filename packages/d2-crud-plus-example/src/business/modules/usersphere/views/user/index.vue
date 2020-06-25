<template>
    <d2-container>
        <template slot="header">
          用户管理
          <example-helper title="权限管理帮助" >
            <div>
              <link-button href="http://greper.gitee.io/d2-crud-plus/guide/permission.html">权限管理帮助文档</link-button>
            </div>
          </example-helper>
        </template>
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  ></crud-search>
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
            <el-button slot="header" class="d2-mb-5" size="small" type="primary" @click="addRow">新增</el-button>
        </d2-crud>
        <crud-footer ref="footer"
                     :current="crud.page.current"
                     :size="crud.page.size"
                     :total="crud.page.total"
                     @change="handlePaginationChange"
        >
        </crud-footer>
        <el-dialog title="授予角色"
                   :visible.sync="dialogPermissionVisible">

            <el-collapse v-model="activeNames" >
                <el-collapse-item v-for="group in roleList" :key="group.platform.id" :title="group.platform.name" :name="group.platform.id">
                        <el-checkbox-group v-model="group.checked">
                        <el-checkbox v-for="option in group.roles"
                                     :key="option.id"
                                     :label="option.id" >{{option.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-collapse-item>
            </el-collapse>

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
      activeNames: [],
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
        const roleList = ret.data
        let userRoles = event.row.roles
        if (userRoles == null) {
          userRoles = []
        }
        this.activeNames.splice(0, this.activeNames.length)
        roleList.forEach(item => {
          item.checked = item.roles.map(item => item.id).filter(item => userRoles.indexOf(item) >= 0)
          this.activeNames.push(item.platform.id)
          console.log('checked', item.checked)
        })
        this.$set(this, 'roleList', roleList)
        this.currentUserId = event.row.id
        this.dialogPermissionVisible = true
      })
    },
    updatePermession (userId) {
      let checked = []
      for (const item of this.roleList) {
        checked = checked.concat(item.checked)
      }
      DoAuthz(userId, checked).then(ret => {
        this.dialogPermissionVisible = false
        this.doRefresh()
      })
    }
  }
}
</script>
