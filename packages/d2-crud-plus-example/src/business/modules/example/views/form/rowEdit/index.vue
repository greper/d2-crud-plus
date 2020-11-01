<template>
  <crud-container  :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      行编辑
      <span style="color:gray;font-size: 12px">【点击右边帮助按钮,如何启用行编辑】</span>
      <example-helper title="帮助说明" >
        <div>
          如下配置即可
          <pre>
            const crudOptions={
              rowHandle:{
                rowEdit:{}
              }
            }
          </pre>
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
        <el-button size="small" type="primary" @click="lineEditAdd()"><i class="el-icon-plus"/> 新增</el-button>

        <el-switch style="margin-left:10px;"  v-model="needValidation" @change="validationChanged"
                   active-text="需要校验"
                   inactive-text="关闭校验" ></el-switch>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
      </div>
    </d2-crud-x>
  </crud-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formToolbar',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      needValidation: true
    }
  },
  methods: {
    validationChanged (newValue) {
      this.crud.options.lineEdit.validation = newValue
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return GetList(query)
    },
    addRequest (row) {
      return AddObj(row).then(ret => {
        row.id = ret.data
        return { row: row }
      })
    },
    updateRequest (row) {
      return UpdateObj(row).then(ret => {
        return { row }
      })
    },
    delRequest (row) {
      return DelObj(row.id)
    }
  }
}
</script>
