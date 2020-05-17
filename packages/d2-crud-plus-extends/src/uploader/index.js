import choose from './choose'
import config from './config'
import lodash from 'lodash'
function install (Vue, options) {
  lodash.merge(config, options)
  const buildKey = config.buildKey
  options = {
    alioss: config.alioss,
    cos: config.cos,
    form: config.form,
    qiniu: config.qiniu
  }

  Object.keys(options).forEach(key => {
    if (options[key].buildKey == null) {
      options[key].buildKey = buildKey
    }
    choose.get(key).init(options[key])
  })
}
export default {
  install,
  choose,
  getUploader (type) {
    let uploader = null
    if (type != null && type !== '') {
      uploader = choose.get(type)
    }
    if (uploader == null) {
      uploader = config.defaultType
    }
    console.log('getUploader:', uploader)
    return uploader
  },
  getConfig () {
    return config
  },
  getDefaultType () {
    return config.defaultType ? config.defaultType : 'cos'
  }
}
