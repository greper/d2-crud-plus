import choose from './choose'
import config from './config'
import lodash from 'lodash'
import log from '../utils/util.log'
function install (Vue, options) {
  lodash.merge(config, options)
}
function init (uploader, type) {
  if (!uploader.inited) {
    uploader.inited = true
  }
  const buildKey = config.buildKey
  const options = {
    alioss: config.alioss,
    cos: config.cos,
    form: config.form,
    qiniu: config.qiniu
  }
  if (options[type].buildKey == null) {
    options[type].buildKey = buildKey
  }
  log.debug('uploader [' + type + '] init ....')
  uploader.init(options[type])
}
export default {
  install,
  choose,
  getUploader (type) {
    if (type == null || type === '') {
      type = this.getDefaultType()
    }
    return choose.get(type).then(uploader => {
      init(uploader, type)
      return uploader
    })
  },
  getConfig (type) {
    if (type == null) {
      return config
    }
    return config[type]
  },
  getDefaultType () {
    return config.defaultType ? config.defaultType : 'cos'
  }
}
