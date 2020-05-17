export default {
  phoneNumber: {
    form: { component: { name: 'el-phone-number-input',
      props: {
        size: 'sm'
      }
    } },
    formatter (row, column, value, index) {
      let ret = ''
      if (value != null) {
        if (value.callingCode != null) {
          ret += '(+' + value.callingCode + ')'
        } else if (value.countryCode != null) {
          ret += '(' + value.countryCode + ')'
        }
        if (value.phoneNumber != null) {
          ret += value.phoneNumber
        }
      }
      return ret
    }
  }
}
