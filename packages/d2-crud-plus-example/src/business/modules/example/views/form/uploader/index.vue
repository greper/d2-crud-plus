<template>
  <d2-container>
    <template slot="header">文件上传
      <example-helper title="文件上传组件crud配置" >
          <h4>目前支持腾讯云cos、七牛、阿里云oss等三种对象存储的web端直传</h4>
          <h4>1、准备</h4>
          <div>
              <ul>
                  <li>创建相应的bucket</li>
                  <li>生产环境还需配置获取相应的授权：腾讯云、阿里云的sts，七牛要获取token</li>
                  <li>后端实现请参考：https://github.com/greper/d2-crud-plus-server.git</li>
                  <li>更多文档：https://github.com/greper/d2-crud-plus/tree/master/packages/d2-crud-plus-extends</li>
              </ul>
          </div>
          <h4>2、引入</h4>
          <d2-highlight :code="helper.init" lang="javascript"/>
          <h4>3、使用：crud配置</h4>
          <div>
              <ul>
                  <li>给column配置type即可，可选值：[avatar-uploader，image-uploader，file-uploader]</li>
              </ul>
          </div>
          <d2-highlight :code="helper.crud" lang="javascript"/>
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
      <el-button slot="header" style="margin-bottom: 5px" size="small" type="primary" @click="addRow">新增</el-button>

      <template slot="fileHelperSlot" >
        <el-alert type="warning" style="line-height: 2">
          注意：<el-tag size="mini">mock</el-tag>下的<el-tag size="mini">form</el-tag>方式没有进度条显示，请在.env.xxx中配置VUE_APP_BUILD_MODE=NOMOCK；<br/>
          另外<el-tag size="mini">alioss</el-tag>方式暂不支持进度条，不支持中文等特殊字符文件名<br/>
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
import helper from './helper'

export default {
  name: 'formUploader',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      helper: helper
    }
  },
  computed: {
    helperHeight () {
      let height = document.documentElement.clientHeight - 100
      return height + 'px'
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
    }
  }
}
</script>
