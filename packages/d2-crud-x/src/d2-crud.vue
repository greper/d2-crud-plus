<template>
  <div
    class="d2-crud"
    v-loading="loading"
    :element-loading-text="loadingOptions ? handleAttribute(loadingOptions.text, null) : null"
    :element-loading-spinner="loadingOptions ? handleAttribute(loadingOptions.spinner, null) : null"
    :element-loading-background="loadingOptions ? handleAttribute(loadingOptions.background, null) : null"
  >
    <div class="d2-crud-header" v-if="$slots.header">
      <slot name="header"/>
    </div>
    <div class="d2-crud-body" v-if="options && options.hide === true">
      <slot name="body"/>
    </div>
    <div class="d2-crud-body" v-else >
      <el-table
        ref="elTable"
        :data="d2CrudData"
        v-bind="options"
        @current-change="handleCurrentChange"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
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
      >
        <el-table-column
          v-if="selectionRow || selectionRow === ''"
          type="selection"
          :label="handleAttribute(selectionRow.title, '')"
          v-bind="selectionRow"
        >
        </el-table-column>
        <el-table-column
          v-if="expandRow || expandRow === ''"
          type="expand"
          :label="handleAttribute(expandRow.title, '')"
          v-bind="expandRow"
        >
          <template slot-scope="scope">
            <slot name="expandSlot" :row="scope.row"/>
          </template>
        </el-table-column>
        <el-table-column
          v-if="indexRow || indexRow === ''"
          type="index"
          :label="handleAttribute(indexRow.title, '')"
          v-bind="indexRow"
        >
        </el-table-column>
        <!-- 使用d2-column递归组件 -->
        <d2-column v-for="(item, index) in columns"
                   :key="index"
                   :item="item"
                   @cell-data-change="handleCellDataChange"
                   @cell-component-ready="handleCellComponentReady"
                   @cell-component-custom-event="handleCellComponentCustomEvent"
        >
            <template slot-scope="scope" :slot="item.key+'Slot'">
              <template v-if="item.rowSlot">
                <slot :name="item.key+'Slot'" :row="scope.row"/>
              </template>
            </template>
        </d2-column>

        <el-table-column
          v-if="rowHandle"
          :label="handleAttribute(rowHandle.columnHeader, '操作')"
          v-bind="rowHandle"
        >
          <template slot-scope="scope">
            <el-button
              v-if="rowHandle.edit && handleRowHandleButtonShow(rowHandle.edit.show, scope.$index, scope.row)"
              :disabled="handleRowHandleButtonDisabled(rowHandle.edit.disabled, scope.$index, scope.row)"
              v-bind="rowHandle.edit"
              @click="handleEdit(scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.edit.text, '编辑')}}
            </el-button>
            <el-button
              v-if="rowHandle.remove && handleRowHandleButtonShow(rowHandle.remove.show, scope.$index, scope.row)"
              :type="handleAttribute(rowHandle.remove.type, 'danger')"
              :disabled="handleRowHandleButtonDisabled(rowHandle.remove.disabled, scope.$index, scope.row)"
              v-bind="rowHandle.remove"
              @click="handleRemove(scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.remove.text, '删除')}}
            </el-button>
            <template
              v-for="(item, index) in handleAttribute(rowHandle.custom, [])"
              >
              <el-button :key="index"
                v-if="handleRowHandleButtonShow(item.show, scope.$index, scope.row)"
                :disabled="handleRowHandleButtonDisabled(item.disabled, scope.$index, scope.row)"
                v-bind="item"
                @click="$emit(item.emit, {index: scope.$index, row: scope.row})"
              >
                {{item.text}}
              </el-button>
            </template>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div class="d2-crud-pagination" v-if="pagination">
      <el-pagination
        v-bind="pagination"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        @prev-click="handlePaginationPrevClick"
        @next-click="handlePaginationNextClick"
      >
      </el-pagination>
    </div>

    <!-- 表单对话框 -->
    <el-dialog
      v-if="isDialogShow"
      :visible.sync="isDialogShow"
      :before-close="handleDialogCancel"
      v-bind="formOptions"
    >
      <template slot="title">
        {{formMode === 'edit' ? editTitle : addTitle}}
        <slot name="FormHeaderSlot" v-bind:mode="formMode" v-bind:data="formData" />
        <button v-if="formOptions.fullscreen!=null" type="button"  class="el-dialog__headerbtn" style="right:50px" @click="formOptions.fullscreen = !formOptions.fullscreen" ><i class="el-dialog__close el-icon el-icon-full-screen"></i></button>
      </template>
      <el-form
        ref="form"
        :model="formData"
        :rules="handleFormRulesMode()"
        :fullscreen="formOptions.fullscreen"
        v-bind="formOptions"
      >
        <el-row v-bind="formOptions" >
          <template v-for="(item,key, index) in formTemplateStorage" >
            <el-col :key="index"
              v-if="getTemplateComponentAttr(item,'show', true)"
              :span="getTemplateComponentAttr(item,'span', 24)"
              :offset="getTemplateComponentAttr(item,'offset', 0)"
            >
              <d2-form-item
                :template="item"
                :colKey="key"
                :formData="formData"
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

        <el-collapse v-if="formTemplateGroupStorage" v-model="formGroupsActive" :accordion="formTemplateGroupStorage.accordion"    >
          <el-collapse-item v-for="(group,groupKey) in formTemplateGroupStorage.groups" :name="groupKey" :key="groupKey" :disabled="group.disabled" >
            <template slot="title" >
              <h3 v-if="!$scopedSlots[groupKey+'GroupTitleSlot']" class="group-title" ><i v-if="group.icon" class="header-icon" :class="group.icon"/> {{group.title}}</h3>
              <slot :name="groupKey+'GroupTitleSlot'" :groupKey="groupKey" :group="group"/>
            </template>
            <el-row v-bind="formOptions">
              <template v-for="(item,key, index) in group.columns" >
                <el-col :key="index"
                        v-if="getTemplateComponentAttr(item,'show', true)"
                        :span="getTemplateComponentAttr(item,'span', 24)"
                        :offset="getTemplateComponentAttr(item,'offset', 0)"
                >
                  <d2-form-item
                    :template="item"
                    :colKey="key"
                    :formData="formData"
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
        </el-collapse>

        <slot name="FormBodyAppendSlot" :mode="formMode" :form="formData"/>
      </el-form>
      <div slot="footer">
          <slot name="FormFooterSlot" :mode="formMode" :data="formData" />
        <el-button
          :size="formOptions ? handleAttribute(formOptions.saveButtonSize, null) : null"
          :type="formOptions ? handleAttribute(formOptions.saveButtonType, null) : null"
          :icon="formOptions ? handleAttribute(formOptions.saveButtonIcon, null) : null"
          :loading="formOptions ? handleAttribute(formOptions.saveLoading, false) : false"
          @click="handleDialogSave"
        >
        {{formOptions ? handleAttribute(formOptions.saveButtonText, '确定') : '确定'}}
        </el-button>
      </div>
    </el-dialog>
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

export default {
  name: 'd2-crud',
  mixins: [
    base,
    data,
    handleRow,
    edit,
    add,
    remove,
    dialog,
    pagination,
    exposeMethods,
    utils
  ],
  components: {
    D2FormItem,
    D2Column
  },
  methods: {
    handleFormDataChange (event) {
      this.$emit('form-data-change', event)
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
      this.$emit('form-dialog-opened', { event: event, form: this.formData })
    }
  }
}
</script>

<style lang="scss">
.d2-crud {
  .d2-crud-header {
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
  }
  .d2-crud-body {
    padding: 15px 0;
    overflow: hidden;
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
}
</style>
