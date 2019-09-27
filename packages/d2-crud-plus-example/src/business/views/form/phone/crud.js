import { mobileValidator } from 'el-phone-number-input'
export const crudOptions = {
  columns: [
    {
      title: '手机号',
      key: 'mobileValue',
      sortable: true,
      align: 'left',
      search: {
        disabled: false,
        width: '260px'
      },
      type: 'phoneNumber',
      form: {
        rules: [{ required: true, message: '请输入手机号' }, { validator: mobileValidator, message: '手机号不正确' }]
      },
      valueBuilder (row) { // 将row里面手机号相关的字段组合成组件需要的value对象
        row.mobileValue = { phoneNumber: row.phone, callingCode: row.code, countryCode: row.country }
      },
      valueResolve (row) { // 将value解析成row的字段
        if (row.mobileValue != null) {
          row.phone = row.mobileValue.phoneNumber
          row.code = row.mobileValue.callingCode
          row.country = row.mobileValue.countryCode
        }
      }
    }
  ]
}
