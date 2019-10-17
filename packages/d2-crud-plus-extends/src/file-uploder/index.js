import FileUploader from './lib/file-uploader.vue'
import ImagesFormat from './lib/images-format.vue'
import utils from './lib/utils'

const types = {
  'image-cos-uploader': {
    form: { component: { name: 'd2p-file-uploader', props: { type: 'cos', elProps: { listType: 'picture-card' } } } },
    component: { name: 'd2p-images-format' },
    align: 'center'
  },
  'avatar-cos-uploader': {
    form: {
      component: {
        name: 'd2p-file-uploader',
        props: { type: 'cos', elProps: { listType: 'avatar', showFileList: false } }
      }
    },
    component: { name: 'd2p-images-format' },
    align: 'center'
  },
  'file-cos-uploader': {
    form: { component: { name: 'd2p-file-uploader', props: { type: 'cos', elProps: { listType: 'text' } } } }
  }
}

function install (Vue, options) {
  Vue.component(FileUploader.name, FileUploader)
  Vue.component(ImagesFormat.name, ImagesFormat)
  utils.getUploadUrl = options.getUploadUrl// getUploadUrl(fileType,filename)
  options.d2CrudPlus.util.columnResolve.addTypes(types)
}

export default {
  install
}
