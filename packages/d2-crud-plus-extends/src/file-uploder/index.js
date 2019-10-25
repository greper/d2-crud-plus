import config from './lib/config'

const types = {
  'image-uploader': {
    form: { component: { name: 'd2p-file-uploader', props: { elProps: { listType: 'picture-card', accept: '.png,.jpeg,.jpg,.ico,.bmp,.gif' } } } },
    component: { name: 'd2p-images-format' },
    align: 'center'
  },
  'avatar-uploader': {
    form: { component: { name: 'd2p-file-uploader', props: { elProps: { listType: 'avatar', accept: '.png,.jpeg,.jpg,.ico,.bmp,.gif', showFileList: false } } } },
    component: { name: 'd2p-images-format' },
    align: 'center',
    valueResolve (row, col) {
      let value = row[col.key]
      if (value != null && value instanceof Array) {
        if (value.length >= 0) {
          row[col.key] = value[0].url
        } else {
          row[col.key] = null
        }
      }
    }
  },
  'file-uploader': {
    form: { component: { name: 'd2p-file-uploader', props: { elProps: { listType: 'text' } } } }
  }
}

function install (Vue, options) {
  Vue.component('d2p-file-uploader', () => import('./lib/file-uploader'))
  Vue.component('d2p-images-format', () => import('./lib/images-format.vue'))

  if (options != null) {
    // 覆盖用户配置
    Object.assign(config, options)
    // 配置type
    if (options.d2CrudPlus != null) {
      // 设置默认uploader
      let defaultType = config.defaultType != null ? config.defaultType : 'cos'
      for (let typesKey in types) {
        types[typesKey].form.component.props.type = defaultType
      }
      options.d2CrudPlus.util.columnResolve.addTypes(types)
    }
  }
}

export default {
  install
}
