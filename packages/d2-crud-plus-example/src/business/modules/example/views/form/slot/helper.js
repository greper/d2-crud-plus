export default {
  crud: `export const crudOptions = {
  columns: [
    {
      title: '插槽示例',
      key: 'slotExample',
      sortable: true,
      search: {
        disabled: false,
         /**
          *启用search的插槽，在crud-search下写自定义slot即可
          *插槽name为key+SearchSlot
          *scope.form为当前表单form
          */
        slot: true
      },
      form: {
          /**
            *启用编辑对话框的插槽，在d2-crud下写自定义slot即可
            *插槽name为key+FormSlot
            *scope.form为当前表单form
            */
        slot: true
      },
      /**
      *启用行内插槽，在d2-crud下写自定义slot即可
      *插槽name为key+Slot
      *scope.row为当前行
      */
      rowSlot: true
    }
  ]
}

`,
  template: `<template>
  <d2-container>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  >
      <template slot="slotExampleSearchSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是写在slot上的" @blur="inputBlur('search')"></el-input>
      </template>
    </crud-search>
    <d2-crud ...>
      <template slot="slotExampleSlot" slot-scope="scope">
        <el-tag>{{scope.row['slotExample']}}</el-tag>
      </template>
      <template slot="slotExampleFormSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是通过slot自定义的" @blur="inputBlur('form')"></el-input>
      </template>
    </d2-crud>
  </d2-container>
</template>
  `
}
