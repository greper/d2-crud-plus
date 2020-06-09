import d2Admin from './d2-admin'
import Vue from 'vue'
Vue.use(d2Admin)

Vue.component('example-helper', () => import('./example-helper/index.vue'))
Vue.component('el-phone-number-input', () => import('el-phone-number-input'))
