<template>
  <div
    class="d2-crud"
    v-loading="loading"
    :element-loading-text="loadingOptions ? handleAttribute(loadingOptions.text, null) : null"
    :element-loading-spinner="loadingOptions ? handleAttribute(loadingOptions.spinner, null) : null"
    :element-loading-background="loadingOptions ? handleAttribute(loadingOptions.background, null) : null"
  >
    <div class="d2-crud-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="d2-crud-body" v-if="options && options.hide === true">
      <slot name="body"></slot>
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
            <slot :name="'expandSlot'" v-bind:row="scope.row"></slot>
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
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :label="handleAttribute(item.title, '')"
          :prop="handleAttribute(item.key, null)"
          v-bind="item"
        >
          <template slot-scope="scope">
            <template v-if="item.rowSlot === true">
              <slot :name="item.key+'Slot'" v-bind:row="scope.row"/>
            </template>
            <render-custom-component
              v-else-if="item.component && item.component.name"
              v-model="scope.row[item.key]"
              :component-name="item.component.name"
              :props="item.component.props ? item.component.props : null"
              @change="handleCellDataChange($event, {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              :scope="scope">
            </render-custom-component>
            <render-component
              v-else-if="item.component && item.component.render"
              :render-function="item.component.render"
              @change="handleCellDataChange($event, {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              :scope="scope"
            >
            </render-component>
            <template v-else>{{item.formatter ? item.formatter(scope.row, scope.column, _get(scope.row, item.key), scope.$index) : _get(scope.row, item.key)}}</template>
          </template>

          <template v-if="item.children">
            <el-table-column
              v-for="(item2, index2) in item.children"
              :key="index2"
              :label="handleAttribute(item2.title, '')"
              :prop="handleAttribute(item2.key, null)"
              v-bind="item2"
            >
              <template slot-scope="scope">
                <template v-if="item2.rowSlot === true">
                  <slot :name="item2.key+'Slot'" v-bind:row="scope.row"></slot>
                </template>
                <render-custom-component
                  v-else-if="item2.component && item2.component.name"
                  v-model="scope.row[item2.key]"
                  :component-name="item2.component.name"
                  :props="item2.component.props ? item2.component.props : null"
                  @change="handleCellDataChange($event, {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  :scope="scope">
                </render-custom-component>
                <render-component
                  v-else-if="item2.component && item2.component.render"
                  :render-function="item2.component.render"
                  @change="handleCellDataChange($event, {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  :scope="scope"
                >
                </render-component>
                <template v-else>{{item2.formatter ? item2.formatter(scope.row, scope.column, _get(scope.row, item2.key), scope.$index) : _get(scope.row, item2.key)}}</template>
              </template>
              <template v-if="item2.children">
                <el-table-column
                  v-for="(item3, index3) in item2.children"
                  :key="index3"
                  :label="handleAttribute(item3.title, '')"
                  :prop="handleAttribute(item3.key, null)"
                  v-bind="item3"
                >
                  <template slot-scope="scope">
                    <template v-if="item3.rowSlot === true">
                      <slot :name="item3.key+'Slot'" v-bind:row="scope.row"></slot>
                    </template>
                    <render-custom-component
                      v-else-if="item3.component && item3.component.name"
                      v-model="scope.row[item3.key]"
                      :component-name="item3.component.name"
                      :props="item3.component.props ? item3.component.props : null"
                      @change="handleCellDataChange($event, {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      :scope="scope">
                    </render-custom-component>
                    <render-component
                      v-else-if="item3.component && item3.component.render"
                      :render-function="item3.component.render"
                      @change="handleCellDataChange($event, {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      :scope="scope"
                    >
                    </render-component>
                    <template v-else>{{item3.formatter ? item3.formatter(scope.row, scope.column, _get(scope.row, item3.key), scope.$index) : _get(scope.row, item3.key)}}</template>
                  </template>

                </el-table-column>
              </template>

            </el-table-column>
          </template>
        </el-table-column>
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
      :title="formMode === 'edit' ? editTitle : addTitle"
      :visible.sync="isDialogShow"
      :before-close="handleDialogCancel"
      v-bind="formOptions"
    >
      <el-form
        ref="form"
        :model="formData"
        :rules="handleFormRulesMode()"
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
                  :scope="formData[key]"
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
        <template v-if="formOptions && formOptions.footer && formOptions.footer.slot">
          <slot name="FormFooterSlot" v-bind:data="formData" ></slot>
        </template>

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
    renderComponent,
    renderCustomComponent
    // d2Column
  },
  methods: {
    handleFormDataChange (value, key) {
      this.$emit('form-data-change', { key: key, value: value, form: this.formData })
    },
    handleCellDataChange (value, column, row) {
      column.value = value
      this.$emit('cell-data-change', { key: column.key, value: value, row: row })
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

<style lang="scss" scoped>
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
