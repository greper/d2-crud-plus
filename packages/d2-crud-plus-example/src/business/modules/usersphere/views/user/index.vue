<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          用户管理
          <example-helper title="权限管理帮助" >
            <div>
              <link-button href="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html">权限管理帮助文档</link-button>
            </div>
          </example-helper>
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @authz="authzHandle">
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button slot="header" v-permission="'usersphere:user:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>

        </d2-crud-x>
        <el-dialog title="授予角色"
                   :visible.sync="dialogPermissionVisible">

          <el-checkbox-group v-model="checkedRoleIds">
            <el-checkbox class="d2-mb-10" v-for="option in roleList" :key="option.id"  :label="option.id" >{{option.name}}</el-checkbox>
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
import * as api from './api'
export default {
  name: 'User',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      roleList: [],
      checkedRoleIds: [],
      dialogPermissionVisible: false,
      currentUserId: undefined
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
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
    infoRequest (row) {
      return api.GetObj(row.id)
    },
    authzHandle (event) {
      api.GetRoleList().then(ret => {
        const roleList = ret.data
        let userRoles = event.row.roles
        if (userRoles == null) {
          userRoles = []
        }
        const checkedRoleIds = roleList.map(item => item.id).filter(item => userRoles.indexOf(item) >= 0)
        this.$set(this, 'checkedRoleIds', checkedRoleIds)
        this.$set(this, 'roleList', roleList)
        this.currentUserId = event.row.id
        this.dialogPermissionVisible = true
      })
    },
    updatePermession (userId) {
      api.DoAuthz(userId, this.checkedRoleIds).then(ret => {
        this.dialogPermissionVisible = false
        this.doRefresh()
      })
    }
  }
}
</script>
