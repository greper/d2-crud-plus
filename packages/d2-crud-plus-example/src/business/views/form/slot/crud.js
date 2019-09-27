export const crudOptions = {
  columns: [
    {
      title: '插槽式',
      key: 'slotExample',
      sortable: true,
      search: {
        disabled: false,
        slot: true
      },
      form: {
        slot: true
      },
      rowSlot: true
    }
  ]
}
