import config from '../../config'
import ajax from './ajax'
export default {
  beforeUpload (file, custom) {
    let fileName = file.name
    console.log('-----------开始上传----------', fileName)
    return new Promise(resolve => {
      resolve({})
    })
  },
  doUpload (option, custom, context) {
    return new Promise((resolve, reject) => {
      ajax(option,
        (res) => {
          resolve(config.form.successHandle(res))
        },
        (e) => {
          option.onError(e)
          reject(e)
        })
    })
  }
}
