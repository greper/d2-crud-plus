// import pcaData from 'china-division/dist/pca-code.json'
const pcaData = () => import('china-division/dist/pca-code.json')
const types = {
  'area-selector': {
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true } } } },
    component: { name: 'cascade-format', props: { } },
    dict: { data: pcaData().then(ret => { return ret.default }), label: 'name', value: 'code' },
    _handle (item) {
      this.form.component.props.dict = this.dict
      this.component.props.dict = this.dict
    }
  },
  'area-multi-selector': {
    form: { component: { name: 'd2p-area-selector', props: { elProps: { filterable: true } } } },
    dict: { data: pcaData().then(ret => { return ret.default }), label: 'name', value: 'code' },
    _handle (item) {
      this.form.component.props.dict = this.dict
      this.component.props.dict = this.dict
    }
  }
}

function install (Vue, options) {
  Vue.component('d2p-area-selector', () => import('./lib/area-selector'))
  if (options != null && options.d2CrudPlus != null) {
    options.d2CrudPlus.util.columnResolve.addTypes(types)
  }
}

export default {
  install
}
