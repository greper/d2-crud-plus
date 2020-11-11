<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">七牛上传
      <example-helper title="帮助" >
        <div>
          <link-button href="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/extends/file-uploader.html">文件上传</link-button>
          <link-button href="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/extends/avatar-cropper.html">裁剪上传</link-button>
          <link-button href="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/extends/uploader.html">上传lib</link-button>
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
        <el-button size="small" type="primary"  @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>

      <template slot="fileHelperSlot" >
        <el-alert type="warning" style="line-height: 2">
          <el-tag size="mini">alioss</el-tag>方式暂不支持进度条，不支持中文等特殊字符文件名<br/>
        </el-alert>
      </template>
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  name: 'formUploader',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  computed: {
    helperHeight () {
      const height = document.documentElement.clientHeight - 100
      return height + 'px'
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
