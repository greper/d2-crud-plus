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
      width: 200,
      form: {
        component: {
          props: {
            elProps: { // 与el-uploader 配置一致
              limit: 5 // 限制5个文件
            }
          }
        }
      }
    },
    {
      title: '文件',
      key: 'file',
      sortable: true,
      type: 'file-cos-uploader',
      form: {
        component: {
          props: {
            elProps: {
              limit: 0 // 不限制数量
            }
          }
        }
      }
    }
  ]
}
