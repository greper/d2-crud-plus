import FileUploader from './lib/file-uploader.vue'
import ImagesFormat from './lib/images-format.vue'
import config from './lib/config'

const types = {
  'image-cos-uploader': {
    form: { component: { name: 'd2p-file-uploader', props: { type: 'cos', fileType: 'img', elProps: { listType: 'picture-card' } } } },
    component: { name: 'd2p-images-format' },
    align: 'center'
  },
  'avatar-cos-uploader': {
    form: {
      component: {
        name: 'd2p-file-uploader',
        props: { type: 'cos', elProps: { listType: 'avatar', fileType: 'avatar', showFileList: false } }
      }
    },
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
  'file-cos-uploader': {
    form: { component: { name: 'd2p-file-uploader', props: { type: 'cos', fileType: 'file', elProps: { listType: 'text' } } } }
  }
}

function install (Vue, options) {
  Vue.component(FileUploader.name, FileUploader)
  Vue.component(ImagesFormat.name, ImagesFormat)

  Object.assign(config, options)
  options.d2CrudPlus.util.columnResolve.addTypes(types)
}

export default {
  install
}
