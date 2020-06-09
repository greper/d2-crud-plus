const install = (Vue, options) => {
  Vue.component('d2-highlight', () => import('./d2-highlight'))
  Vue.component('d2-icon-select', () => import('./d2-icon-select/index.vue'))
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
