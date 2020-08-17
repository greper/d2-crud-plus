<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">自定义组件
      <example-helper title="自定义组件帮助说明" >
          <div>
            <link-button href="http://greper.gitee.io/d2-crud-plus/guide/slot.html">slot自定义</link-button>

            <link-button href="http://greper.gitee.io/d2-crud-plus/guide/extends.html">自定义扩展组件说明</link-button>
          </div>
      </example-helper>
    </template>

    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @custom-emit="customEmit">

      <div slot="header">

        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  >
          <el-button slot="prefix" class="d2-mr-5" size="small" type="success" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

          <template slot="slotExampleSearchSlot" slot-scope="scope">
            <el-input v-model="scope.form['slotExample']" placeholder="blur有事件触发" @blur="inputBlur('search')"/>
          </template>
          <el-button slot="suffix"  size="small" type="success" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

          <crud-toolbar :compact.sync="crud.pageOptions.compact"
                        :columns="crud.columns"
                        @refresh="doRefresh()"
                        @columns-filter-changed="handleColumnsFilterChanged"/>
        </crud-search>

      </div>

      <template slot="FormHeaderSlot">
        <i class="el-icon-edit"/>
      </template>

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
      <template slot="slotExampleHelperSlot" slot-scope="scope">
        <el-alert type="warning" >
          我也可以自定义哦，还可以获取到行数据->{{scope.form.slotExample}}
        </el-alert>
      </template>

      <template slot="topicsFormSlot" slot-scope="scope">
        <el-input class="d2-mb-5" v-for="(item,index) in scope.form.topics" :key="index"   v-model="scope.form.topics[index]" >
          <el-button slot="append" icon="el-icon-remove-outline" @click="removeTopic(index)"/>
        </el-input>
        <el-button @click="addTopic">添加主题</el-button>
      </template>

      <template slot="FormFooterSlot" slot-scope="scope">
        <el-button type="success" @click="customBtn()">我是自定义按钮</el-button>
        <el-button @click="saveDraft(scope)">保存草稿</el-button>
      </template>

    </d2-crud-x>

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
    },
    inputBlur (event) {
      console.log('失去焦点：', event)
      this.$message('失去焦点：' + event)
    },
    customEmit () {
      this.$message('自定义按钮')
    },
    addTopic () {
      const form = this.getEditForm()
      console.log('form:', form)
      if (form.topics == null || form.topics === '') {
        form.topics = []
      }
      form.topics.push('')
    },
    removeTopic (index) {
      const form = this.getEditForm()
      console.log('form:', form)
      form.topics.splice(index, 1)
    },
    saveDraft (scope) {
      console.log('保存草稿：', scope)
      this.$message('保存草稿成功，我是自定义按钮')
      this.getD2Crud().isDialogShow = false
    },
    customBtn () {
      this.$message('我是自定义按钮')
    },
    handleDialogOpened ({ mode, form, template, groupTemplate }) {
      console.log('dialog opened:mode=', mode, 'form=', form, 'template=', template, 'group=', groupTemplate)
    }

  }
}
</script>
