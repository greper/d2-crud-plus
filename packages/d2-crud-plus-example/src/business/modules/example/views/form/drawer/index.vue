<template>
  <crud-container  :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      抽屉表单对话框
      <span style="color:gray;font-size: 12px">【点击右边帮助按钮,如何启用抽屉表单】</span>
      <example-helper title="帮助说明" >
        <div>
          如下配置即可
          <pre>
            const crudOptions={
              formOptions:{
                type: 'drawer', //启用抽屉对话框
                draggable: false, //关闭拖拽
                fullscreen: false, //关闭全屏功能
                size: '50%' //宽度50%
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
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
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
  name: 'formDrawer',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
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
    }
  }
}
</script>
