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
        <!-- 暂不使用d2-column递归组件，有bug -->

        <d2-column v-for="(item, index) in columns"
                   :key="index"
                   :item="item">
          <template slot-scope="scope" :slot="item.key+'Slot'">
            <slot :name="item.key+'Slot'" :row="scope.row"/>
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
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.edit) : rowHandle.edit"
              @click="handleEdit(scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.edit.text, '编辑')}}
            </el-button>
            <el-button
              v-if="rowHandle.remove && handleRowHandleButtonShow(rowHandle.remove.show, scope.$index, scope.row)"
              :type="handleAttribute(rowHandle.remove.type, 'danger')"
              :disabled="handleRowHandleButtonDisabled(rowHandle.remove.disabled, scope.$index, scope.row)"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.remove) : rowHandle.remove"
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
                v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item) : item"
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
    <el-dialog
      v-if="isDialogShow"
      :visible.sync="isDialogShow"
      :before-close="handleDialogCancel"
      v-bind="formOptions"
    >
      <template slot="title">
        {{formMode === 'edit' ? editTitle : addTitle}}
        <slot name="FormHeaderSlot" v-bind:mode="formMode" v-bind:data="formData" ></slot>
        <button v-if="formOptions.fullscreen!=null" type="button"  class="el-dialog__headerbtn" style="right:50px" @click="formOptions.fullscreen = !formOptions.fullscreen" ><i class="el-dialog__close el-icon el-icon-full-screen"></i></button>
      </template>
      <el-form
        ref="form"
        :model="formData"
        :rules="handleFormRulesMode()"
        :fullscreen="formOptions.fullscreen"
        v-bind="formOptions"
      >
        <el-row v-bind="formOptions">
          <template v-for="(value, key, index) in formData" >
            <el-col :key="index"
              v-if="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.show, true) : true"
              :span="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.span, 24) : 24"
              :offset="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.offset, 0) : 0"
            >
              <el-form-item
                :label="handleFormTemplateMode(key).title"
                :prop="key"
              >
                <template v-if="handleFormTemplateMode(key).slot === true">
                  <slot :name="key+'FormSlot'" v-bind:form="formData" ></slot>
                </template>
                <el-input
                  v-else-if="(!handleFormTemplateMode(key).component) ||((!handleFormTemplateMode(key).component.name) && (!handleFormTemplateMode(key).component.render)) || handleFormTemplateMode(key).component.name === 'el-input'"
                  v-model="formData[key]"
                  v-bind="(handleFormTemplateMode(key).component.props?handleFormTemplateMode(key).component.props:handleFormTemplateMode(key).component)"
                  @change="handleFormDataChange($event,key)"
                >
                </el-input>
                <render-custom-component
                  v-else-if="handleFormTemplateMode(key).component.name"
                  v-model="formData[key]"
                  :component-name="handleFormTemplateMode(key).component.name"
                  :props="handleFormTemplateMode(key).component.props"
                  :events="handleFormTemplateMode(key).component.events"
                  @change="handleFormDataChange($event,key)"
                  @ready="handleFormComponentReady($event,key)"
                  @custom="handleFormCustomEvent($event,key)"
                >
                </render-custom-component>
                <render-component
                  v-else-if="handleFormTemplateMode(key).component.render"
                  :render-function="handleFormTemplateMode(key).component.render"
                  :scope="{key:key,value:formData[key],row:formData}"
                  @change="handleFormDataChange($event,key)"
                >
                </render-component>
                <template v-if="handleFormTemplateMode(key).helper">
                  <div class="form-item-helper" v-if=" typeof  handleFormTemplateMode(key).helper === 'string'">{{handleFormTemplateMode(key).helper}}</div>
                  <div class="form-item-helper"  v-else-if="handleFormTemplateMode(key).helper.slot === true">
                    <slot :name="key+'HelperSlot'" v-bind:form="formData" ></slot>
                  </div>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <div slot="footer">
          <slot name="FormFooterSlot" v-bind:mode="formMode" v-bind:data="formData" ></slot>
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
import renderComponent from './components/renderComponent.vue'
import renderCustomComponent from './components/renderCustomComponent.vue'
import D2Column from './components/d2-column'

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
    D2Column,
    renderComponent,
    renderCustomComponent
  },
  methods: {
    handleFormDataChange (value, key) {
      this.$emit('form-data-change', { key: key, value: value, form: this.formData })
    },
    handleCellDataChange (column) {
      this.$emit('cell-data-change', column)
    },
    handleFormComponentReady (event, key) {
      this.$emit('form-component-ready', { event: event, key: key, form: this.formData })
    },
    handleFormCustomEvent (event, key) {
      this.$emit('form-component-custom-event', { event: event, key: key, form: this.formData })
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
}
</style>
