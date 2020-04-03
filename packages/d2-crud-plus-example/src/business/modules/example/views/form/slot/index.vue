<template>
  <d2-container>
    <template slot="header">插槽式自定义组件
      <example-helper title="插槽式自定义组件帮助说明" >
          <span>自定义插槽需要<a href="https://github.com/greper/d2-crud" target="_blank">d2-crud的修改版</a>才能支持</span>
          <d2-highlight :code="helper.crud"/>
          <d2-highlight :code="helper.template"/>
      </example-helper>
    </template>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" >
      <template slot="slotExampleSearchSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="blur有事件触发" @blur="inputBlur('search')"></el-input>
      </template>
    </crud-search>
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
        @custom-emit="customEmit">
      <el-button slot="header" style="margin-bottom: 5px" size="small" type="primary" @click="addRow">新增</el-button>

      <template slot="createDateSlot" slot-scope="scope">
        创建时间：{{scope.row['createDate'] | date_timeline('YYYY-MM-DD HH:mm:ss')}}<br/>
        更新时间：{{scope.row['updateDate'] | date_timeline('YYYY-MM-DD HH:mm:ss')}}<br/>
      </template>
      <template slot="slotExampleSlot" slot-scope="scope">
        <el-tag>{{scope.row['slotExample']}}</el-tag>
      </template>
      <template slot="slotExampleFormSlot" slot-scope="scope">
        slot自定义：<el-input v-model="scope.form['slotExample']" placeholder="这是通过slot自定义的" style="width:130px" @blur="inputBlur('form')" ></el-input>
      </template>

      <template slot="topicsFormSlot" slot-scope="scope">
        <el-input class="d2-mb-5" v-for="(item,index) in scope.form.topics" :key="index"   v-model="scope.form.topics[index]" >
          <el-button slot="append" icon="el-icon-remove-outline" v-on:click="removeTopic(index)"></el-button>
        </el-input>
        <el-button v-on:click="addTopic">添加主题</el-button>
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
  name: 'formSelect',
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
      console.log('height:', height)
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
    },
    inputBlur (event) {
      console.log('失去焦点：', event)
      this.$message('失去焦点：' + event)
    },
    customEmit () {
      this.$message('自定义按钮')
    },
    addTopic () {
      let form = this.getEditForm()
      console.log('form:', form)
      if (form.topics == null || form.topics === '') {
        form.topics = []
      }
      form.topics.push('')
    },
    removeTopic (index) {
      let form = this.getEditForm()
      console.log('form:', form)
      form.topics.splice(index, 1)
    }
  }
}
</script>
