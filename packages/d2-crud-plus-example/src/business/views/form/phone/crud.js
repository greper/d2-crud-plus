import { mobileValidator } from 'el-phone-number-input'
import { GetCustomName } from './api'
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
        rules: [{ required: true, message: '请输入手机号' }, { validator: mobileValidator, message: '手机号不正确' }],
        helper: '手机号输入完成后，可以远程获取客户姓名',
        valueChange (key, value, form) {
          console.log('valueResolve', value)
          if (form.phone == null || form.phone !== '') {
            GetCustomName(value.callingCode, value.phoneNumber).then(ret => {
              if (ret.data != null && (form.phone == null || form.phone !== '')) {
                form.guestName = ret.data
              }
            })
          }
        }
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
    },
    {
      title: '客户姓名',
      key: 'guestName',
      sortable: true,
      search: {
        disabled: false
      },
      form: {
        rules: [{ required: false, message: '请输入客户姓名' }]
      }
    }
  ]
}
