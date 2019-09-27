import datefilters from './date'
import Vue from 'vue'
const vueFilters = {
  install: function (Vue, options) {
    Object.keys(datefilters).forEach(name => {
      Vue.filter(name, datefilters[name])
    })
  }
}

Vue.use(vueFilters)

export default vueFilters
