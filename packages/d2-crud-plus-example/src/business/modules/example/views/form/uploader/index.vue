<template>
  <d2-container>
    <template slot="header">文件上传
      <example-helper title="帮助" >
        <div>
          <link-button href="http://greper.gitee.io/d2-crud-plus/guide/extends/file-uploader.html">文件上传</link-button>
          <link-button href="http://greper.gitee.io/d2-crud-plus/guide/extends/avatar-cropper.html">裁剪上传</link-button>
          <link-button href="http://greper.gitee.io/d2-crud-plus/guide/extends/uploader.html">上传lib</link-button>
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
        :loading="crud.loading"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange"
        >
      <el-button slot="header" class="d2-mb-5" size="small" type="primary" @click="addRow">新增</el-button>

      <template slot="fileHelperSlot" >
        <el-alert type="warning" style="line-height: 2">
          <el-tag size="mini">alioss</el-tag>方式暂不支持进度条，不支持中文等特殊字符文件名<br/>
        </el-alert>
      </template>
    </d2-crud>
    <crud-footer ref="footer"
                  :current="crud.page.current"
                  :size="crud.page.size"
                  :total="crud.page.total"
                  @change="handlePaginationChange"
    >
    </crud-footer>

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
