import d2Admin from './d2-admin'
import Vue from 'vue'
import { ElPhoneNumberInput } from 'el-phone-number-input'
Vue.use(d2Admin)
Vue.component('link-button', () => import('./link-button/index.vue'))
Vue.component('example-helper', () => import('./example-helper/index.vue'))
Vue.component('el-phone-number-input', ElPhoneNumberInput)
