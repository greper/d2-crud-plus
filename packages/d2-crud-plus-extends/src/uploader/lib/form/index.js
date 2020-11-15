import ajax from './ajax'
import lodash from 'lodash'
import log from '../../../utils/util.log'
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
   */ async upload ({ file, fileName, onProgress, onError, config }) {
    const options = lodash.cloneDeep(this.options)
    lodash.merge(options, config)
    config = options
    const option = {
      file,
      onProgress,
      onError,
      ...config
    }
    let key = config.buildKey(fileName, {
      file,
      ...(config.custom || {})
    })
    if (key instanceof Promise) {
      key = await key
    }
    if (options.data == null) {
      options.data = {}
    }
    options.data.key = key
    log.debug('upload option ', options)
    return new Promise((resolve, reject) => {
      // onProgress({
      //   total: 0,
      //   percent: 0
      // })
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
