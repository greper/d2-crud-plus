<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">富文本
      <example-helper title="帮助" >
        <div>
          <link-button href="http://greper.gitee.io/d2-crud-plus/guide/extends/full-editor.html">富文本扩展</link-button>
        </div>
      </example-helper>

    </template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @form-component-ready="handleFormComponentReady"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>

    </d2-crud-x>
  </d2-container>
</template>

<script>
import { AddObj, GetObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import helper from './helper'
export default {
  name: 'formEditor',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      helper: helper
    }
  },
  created () {
    // 配置编辑前获取详情
    this.crud.options.fetchDetail = this.fetchDetail
  },
  computed: {
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return GetList(query)
    },
    infoRequest (query) {
      return GetObj(query)
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
    // 编辑对话框打开前获取详情
    fetchDetail (index, row) {
      if (index == null) {
        // 添加
        return {}
      }
      return GetObj(row.id).then(res => {
        this.changeEditor(res.data.change)
        return res.data
      })
    },
    changeEditor (value) {
      if (value === 'quill') {
        this.getEditFormTemplate('content').component.show = true
        this.getEditFormTemplate('content_ueditor').component.show = false
      } else {
        this.getEditFormTemplate('content').component.show = false
        this.getEditFormTemplate('content_ueditor').component.show = true
      }
    },
    handleFormComponentReady (event, key, form) {
      console.log('form component ready:', event, key, form)
    }
  }
}
</script>
