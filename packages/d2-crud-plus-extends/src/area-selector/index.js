import pcaData from 'china-division/dist/pca-code.json'
const types = {
  'area-selector': {
    form: { component: { name: 'cascade-select', props: { } } },
    component: { name: 'cascade-format', props: { } },
    dict: { data: pcaData, label: 'name', value: 'code' },
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
