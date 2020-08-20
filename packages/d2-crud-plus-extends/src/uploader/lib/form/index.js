import ajax from './ajax'
import lodash from 'lodash'

export default {
  options: undefined,
  init (options) {
    this.options = options
  },
  /**
   *
   * @param option {file,filename,action,data,headers}
   * @param config
   * @returns {Promise<unknown>}
   */
  upload ({ file, fileName, onProgress, onError, config }) {
    const options = lodash.cloneDeep(this.options)
    lodash.merge(options, config)
    config = options
    const option = {
      file,
      onProgress,
      onError,
      ...config
    }
    option.data.key = config.buildKey(fileName, config.custom)
    console.log('upload option ', options)
    return new Promise((resolve, reject) => {
      ajax(option,
        (res) => {
          try {
            const url = config.successHandle(res)
            resolve(url)
          } catch (e) {
            onError(e)
          }
        },
        (e) => {
          onError(e)
          reject(e)
        })
    })
  }
}
