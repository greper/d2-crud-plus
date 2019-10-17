export const crudOptions = {
  columns: [
    {
      title: '头像',
      key: 'avatar',
      type: 'avatar-cos-uploader',
      width: 200
    },
    {
      title: '图片',
      key: 'image',
      type: 'image-cos-uploader',
      width: 200
    },
    {
      title: '文件',
      key: 'file',
      sortable: true,
      type: 'file-cos-uploader'
    }
  ]
}
