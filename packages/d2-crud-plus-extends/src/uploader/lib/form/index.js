import ajax from './ajax'
import lodash from 'lodash'

export default {
  options: undefined,
  init (options) {
    this.options = options
    console.log('------init options', options)
  },
  /**
   *
   * @param option {file,filename,action,data,headers}
   * @param config
   * @returns {Promise<unknown>}
   */
  upload ({ file, fileName, onProgress, onError, config }) {
    console.log('------upload options', config, this.options)
    let options = lodash.cloneDeep(this.options)
    lodash.merge(options, config)
    config = options
    console.log('------upload merge', config)
    let option = {
      file,
      onProgress,
      ...config
    }
    return new Promise((resolve, reject) => {
      ajax(option,
        (res) => {
          resolve(config.successHandle(res))
        },
        (e) => {
          onError(e)
          reject(e)
        })
    })
  }
}
