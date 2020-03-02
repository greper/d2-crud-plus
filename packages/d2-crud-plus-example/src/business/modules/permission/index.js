import PM from './lib/index'
import Vue from 'vue'
import permissionDirective from './directive/permission'
if (PM.isEnabled()) {
  Vue.use(permissionDirective)
}
