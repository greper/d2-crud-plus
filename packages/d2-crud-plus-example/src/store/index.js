import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import permission from '../business/modules/permission/lib/permission.store'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin,
    permission
  }
})
