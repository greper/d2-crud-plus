<template>
  <div
    class="d2-crud d2-crud-x"
    :class="{'d2-crud-height100':(options && options.height==='100%')}"
    v-loading="loading"
    :element-loading-text="getAttribute(loadingOptions,'text', null)"
    :element-loading-spinner="getAttribute(loadingOptions,'spinner', null)"
    :element-loading-background="getAttribute(loadingOptions,'background', null)"
  >
    <div class="d2-crud-header" v-if="$slots.header">
      <slot name="header"/>
    </div>
    <div class="d2-crud-body" v-if="options && options.hide === true">
      <slot name="body"/>
    </div>
    <div class="d2-crud-body" v-else >
      <component
        :is="(options.lineEdit&&options.lineEdit.validation)?'el-form':'div'"
        style="height:100%"
        ref="lineEditForm"
        :model="lineEditor.form"
        :rules="handleFormRulesMode()"
        :formMode="formMode"
        v-bind="formOptions"
        labelWidth="0"
      >
      <component
        :is="getTableImpl(options.tableType)"
        ref="elTable"
        :data="d2CrudData"
        v-bind="options"
        @select="handleSelect"
        @sort-change="handleSortChange"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDblclick"
        @row-click="handleRowClick"
        @row-contextmenu="handleRowContextmenu"
        @row-dblclick="handleRowDblclick"
        @header-click="handleHeaderClick"
        @header-contextmenu="handleHeaderContextmenu"
        @current-change="handleCurrentChange"
        v-on="_tableListeners"
      >
        <template v-if="thisIsVxeTable">
          <component
            :is="getTableColumnImpl()"
            v-if="(selectionRow || selectionRow === '') "
            type="checkbox"
            :title="handleAttribute(selectionRow.title, '')"
            v-bind="forBindProps(selectionRow)"
          />
          <component
            v-if="(expandRow || expandRow === '') && thisIsVxeTable"
            :is="getTableColumnImpl()"
            type="expand"
            :title="handleAttribute(expandRow.title, '')"
            v-bind="forBindProps(expandRow)"
          >
            <template slot="content" slot-scope="scope">
              <slot name="expandSlot" :rowIndex="scope.$rowIndex" :index="scope.$rowIndex" :row="scope.row"/>
            </template>
          </component>
          <component
            :is="getTableColumnImpl()"
            v-if="indexRow || indexRow === ''"
            type="seq"
            :title="handleAttribute(indexRow.title, '')"
            v-bind="forBindProps(indexRow)"
          />
        </template>
        <template v-else>
          <component
            :is="getTableColumnImpl()"
            v-if="(selectionRow || selectionRow === '') "
            type="selection"
            :label="handleAttribute(selectionRow.title, '')"
            v-bind="forBindProps(selectionRow)"
          />

          <component
            v-if="(expandRow || expandRow === '') "
            :is="getTableColumnImpl()"
            type="expand"
            :label="handleAttribute(expandRow.title, '')"
            v-bind="forBindProps(expandRow)"
          >
            <template  slot-scope="scope">
              <slot name="expandSlot" :scope="scope" :index="scope.$index" :row="scope.row"/>
            </template>
          </component>

          <component
            :is="getTableColumnImpl()"
            v-if="indexRow || indexRow === ''"
            type="index"
            :label="handleAttribute(indexRow.title, '')"
            v-bind="forBindProps(indexRow)"
          />
        </template>

        <!-- 使用d2-column递归组件 -->
        <d2-column v-for="(item, index) in columns"
                   :key="index"
                   :item="item"
                   :tableType="options.tableType"
                   @cell-data-change="handleCellDataChange"
                   @cell-component-ready="handleCellComponentReady"
                   @cell-component-custom-event="handleCellComponentCustomEvent"
        >
            <template slot-scope="scope" :slot="item.key+'Slot'">
              <template v-if="item.rowSlot">
                <slot :name="item.key+'Slot'" :row="scope.row" :index="scope.$index" :rowIndex="scope.$rowIndex"/>
              </template>
            </template>
        </d2-column>

        <component
          :is="getTableColumnImpl(options.tableType)"
          v-if="rowHandle"
          v-bind="forBindPropsRowHandle(rowHandle)"
        >
          <template slot-scope="scope">
            <template
              v-for="(item, index) in ((lineEditor && lineEditor.active && scope.$index === lineEditor.index)?_lineEditModeBtns:_handleBtns)"
            >
              <d2-button :key="index"
                         v-if="handleRowHandleButtonShow(item.show, scope)"
                         :disabled="handleRowHandleButtonDisabled(item.disabled, scope)"
                         :icon="handleAttribute(item.icon,null,scope)"
                         @click="item.doClick(scope)"
                         :label="handleAttribute(item.text,null,scope)"
                         v-bind="item"
              />
            </template>
            <!-- 即将废弃 -->
            <slot name="rowHandle" :index="scope.$index" :rowIndex="scope.$rowIndex" :row="scope.row" ></slot>
            <slot name="rowHandleSlot" :index="scope.$index" :rowIndex="scope.$rowIndex" :row="scope.row"></slot>
          </template>

        </component>
      </component>
      </component>
    </div>
    <div class="d2-crud-footer">
      <div class="d2-crud-pagination" v-if="pagination">
        <el-pagination
          v-bind="pagination"
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          @prev-click="handlePaginationPrevClick"
          @next-click="handlePaginationNextClick"
        >
          <slot name="PaginationPrefixSlot" />
        </el-pagination>
      </div>
      <slot name="footer"/>
    </div>

    <!-- 表单对话框 -->
    <component
      :is="'el-'+(formOptions.type || 'dialog')"
      class="d2-crud-dialog"
      :visible="isDialogShow"
      v-on:update:visible="handleDialogShowUpdate"
      :before-close="handleDialogCancel"
      v-d2p-drag-dialog="handleAttribute(formOptions.draggable,true)"
      :class="{'d2p-drag-dialog':handleAttribute(formOptions.draggable,true),'d2p-form-drawer':isFormDrawer}"
      v-bind="formOptions"
    >
      <template slot="title">
       <span> {{getFormTitle()}}</span>
        <slot name="FormHeaderSlot" :mode="formMode" :data="formData"  :form="formData"/>
        <button v-if="formOptions.fullscreen!=null" type="button"  class="el-dialog__headerbtn fullscreen" @click="formOptions.fullscreen = !formOptions.fullscreen" ><i class="el-dialog__close el-icon el-icon-full-screen"/></button>
      </template>
      <el-form
        v-if="isFormShow"
        ref="form"
        :model="formData"
        :rules="handleFormRulesMode()"
        :fullscreen="formOptions.fullscreen"
        :formMode="formMode"
        v-bind="formOptions"
      >
        <el-row v-bind="formOptions" >
          <template v-for="(item,key, index) in formTemplateStorage" >
            <el-col :key="index"
              v-if="getTemplateComponentAttr(item,'show', true,getContext(key))"
              :span="getTemplateComponentAttr(item,'span', 24)"
              :offset="getTemplateComponentAttr(item,'offset', 0)"
            >
              <d2-form-item
                :template="item"
                :colKey="key"
                :formData="formData"
                :ref="'form_item_'+key"
                :formMode="formMode"
                :getColumn="getFormComponentRef"
                @form-data-change="handleFormDataChange"
                @form-component-ready="handleFormComponentReady"
                @form-component-custom-event="handleFormComponentCustomEvent"
              >
                <template :slot="key+'FormSlot'">
                    <slot :name="key+'FormSlot'" :form="formData" :mode="formMode"/>
                </template>
                <template :slot="key+'HelperSlot'">
                    <slot :name="key+'HelperSlot'" :form="formData" :mode="formMode"/>
                </template>
              </d2-form-item>
            </el-col>
          </template>
        </el-row>

        <el-collapse v-if="formTemplateGroupStorage" v-model="formGroupsActive" :accordion="formTemplateGroupStorage.accordion"    >
          <template v-for="(group,groupKey) in formTemplateGroupStorage.groups"   >
            <el-collapse-item :key="groupKey" :name="groupKey" :disabled="group.disabled"  v-if="getAttribute(group,'show', true,{mode:formMode,form:formData})">
              <template slot="title" >
                <h3 v-if="!$scopedSlots[groupKey+'GroupTitleSlot']" class="group-title" ><i v-if="group.icon" class="header-icon" :class="group.icon"/> {{group.title}}</h3>
                <slot :name="groupKey+'GroupTitleSlot'" :groupKey="groupKey" :group="group"/>
              </template>
              <el-row v-bind="formOptions">
                <template v-for="(item,key, index) in group.columns" >
                  <el-col :key="index"
                          v-if="getTemplateComponentAttr(item,'show', true,getContext(key))"
                          :span="getTemplateComponentAttr(item,'span', 24)"
                          :offset="getTemplateComponentAttr(item,'offset', 0)"
                  >
                    <d2-form-item
                      :template="item"
                      :colKey="key"
                      :formData="formData"
                      :ref="'form_item_'+key"
                      :formMode="formMode"
                      :getColumn="getFormComponentRef"
                      @form-data-change="handleFormDataChange"
                      @form-component-ready="handleFormComponentReady"
                      @form-component-custom-event="handleFormComponentCustomEvent"
                    >
                      <template :slot="key+'FormSlot'">
                        <slot :name="key+'FormSlot'" :form="formData"/>
                      </template>
                      <template :slot="key+'HelperSlot'">
                        <slot :name="key+'HelperSlot'" :form="formData"/>
                      </template>
                    </d2-form-item>
                  </el-col>
                </template>
              </el-row>
            </el-collapse-item>
          </template>
        </el-collapse>
        <div class="form-body-append">
          <slot name="FormBodyAppendSlot" :mode="formMode" :form="formData"/>
        </div>
      </el-form>
      <div class="d2p-form-footer" :slot="isFormDrawer?'default':'footer'" >
        <slot name="FormFooterSlot" :mode="formMode" :data="formData" :form="formData" />
        <el-button v-if="getAttribute(formOptions,'saveButtonShow', true)"
          :size="getAttribute(formOptions,'saveButtonSize', null)"
          :type="getAttribute(formOptions,'saveButtonType' ,null)"
          :icon="getAttribute(formOptions,'saveButtonIcon', null)"
          :disabld="getAttribute(formOptions,'saveButtonDisabled', false)"
          :loading="getAttribute(formOptions,'saveLoading', false)"
          @click="handleDialogSave"
        >
        {{ getAttribute(formOptions,'saveButtonText', '确定')}}
        </el-button>
      </div>
    </component>
  </div>
</template>

<script>
import base from './mixin/base'
import handleRow from './mixin/handleRow'
import data from './mixin/data'
import edit from './mixin/edit'
import add from './mixin/add'
import remove from './mixin/remove'
import dialog from './mixin/dialog'
import pagination from './mixin/pagination'
import exposeMethods from './mixin/exposeMethods.js'
import utils from './mixin/utils'
import D2Column from './components/d2-column'
import D2FormItem from './components/d2-form-item'
import D2Button from './components/d2-button/component'
import view from './mixin/view'

export default {
  name: 'd2-crud',
  provide: function () {
    return {
      d2CrudContext: {
        getForm: this.getFormData,
        getLineEditor: () => {
          return this.lineEditor
        }
      }
    }
  },
  mixins: [
    base,
    data,
    handleRow,
    edit,
    add,
    view,
    remove,
    dialog,
    pagination,
    exposeMethods,
    utils
  ],
  components: {
    D2FormItem,
    D2Column,
    D2Button
  },
  computed: {
    _tableListeners () {
      const events = this.options.events || {}
      if (this.isVxeTable()) {
        return {
          'checkbox-all': this.handleSelectAll,
          'checkbox-change': this.handleSelectionChange,
          ...events
        }
      } else {
        return {
          'select-all': this.handleSelectAll,
          'selection-change': this.handleSelectionChange,
          ...events
        }
      }
    }
  },
  methods: {
    handleFormDataChange (event) {
      this.$emit('form-data-change', { getComponent: this.getFormComponentRef, ...event })
    },
    handleFormComponentReady (event) {
      this.$emit('form-component-ready', event)
    },
    handleFormComponentCustomEvent (event) {
      this.$emit('form-component-custom-event', event)
    },
    handleCellDataChange (column) {
      this.$emit('cell-data-change', column)
    },
    handleCellComponentReady (column) {
      this.$emit('cell-component-ready', column)
    },
    handleCellComponentCustomEvent (column) {
      this.$emit('cell-component-custom-event', column)
    },
    handleDialogOpened (event) {
      // TODO 暂时无效
      this.$emit('form-dialog-opened', { event: event, form: this.formData, row: this.formDataStorage })
    },
    getFormComponentRef (key) {
      if (this.$refs) {
        const wrapper = this.$refs['form_item_' + key]
        if (wrapper && wrapper.length > 0 && wrapper[0]) {
          return wrapper[0].getComponentRef()
        }
      }
    },
    getContext (key) {
      return {
        mode: this.formMode,
        key: key,
        value: this.formData[key],
        form: this.formData,
        row: this.formDataStorage
      }
    }
  }
}
</script>

<style lang="scss">

.d2-crud-x {
  display: flex;
  flex-direction: column;
  .d2-crud-header {
    /*border-bottom: 1px dotted rgba(0, 0, 0, 0.2);*/
  }
  .d2-crud-body {
    padding: 15px 0;
    overflow: hidden;
    flex-grow: 1;
  }
  .d2-crud-pagination {
    padding: 15px 0;
  }
  .form-item-helper{
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #737373;
    line-height: normal;
  }
  .el-collapse-item__wrap {
    padding-top: 7px;
  }
  .el-collapse-item__content{
    padding-left:30px;
    padding-right:30px;
  }
  &.d2-crud-height100{
    height:100%;
    .d2-crud-body{
      height: 100%;
    }
  }

  .d2-button{
    &.is-thin{
      &.el-button--small, &.el-button--small.is-round {
        padding: 9px 9px;
      }
      &.el-button--mini, &.el-button--mini.is-round {
        padding: 7px 7px;
      }
    }
  }
  .d2-crud-pagination{
    /*padding:0px 0;*/
    /*display: flex;*/
    /*align-items: center;*/
    .el-pagination{
      .prefix{
        button{
          background-color: #f4f4f5;
          min-width: 30px;
        }
      }
    }
  }
}

.d2-crud-dialog{
  .el-dialog__headerbtn{
    padding:10px;
    top:12px;
    &.fullscreen {
      right:55px;
    }
  }
  &.d2p-drag-dialog{
    .is-fullscreen{
      left:0px !important;
      top:0px !important;
      .el-dialog__header{
        cursor: auto !important;
      }
    }
  }
  .el-form[formMode=view]{
    .el-form-item__label{
      color:#909090
    }
  }

  &.d2p-form-drawer{
    .el-drawer__body{
      padding:20px
    }
    .d2p-form-footer{
      text-align: right;
    }
  }
}
.page-compact{
  .d2-container-full__body{
    padding:0px !important
  }
  .d2-crud-header{
    padding:10px;
    border-bottom:0px
  }
  .d2-crud .d2-crud-body{
    padding:0px;
  }
  .d2-crud-pagination{
    padding:10px 0;
  }
  .el-table--border {
    border-left: none;
  }
}

.d2-mb-2{margin-bottom: 2px}
.d2-mt-2{margin-top: 2px;}
.d2-mr-5{margin-right: 5px}
.d2-mr-10{margin-right: 10px}
</style>
